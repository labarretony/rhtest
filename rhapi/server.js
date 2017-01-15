/*     Modifier le port si necessaire     */
var port = process.env.npm_package_config_port;
var express = require('express');
var morgan = require('morgan'); // Charge le middleware de logging

var fs = require("fs");
var message = '';
var levelmessage = '';
var filteredObj = '';
var nbsalaries='';
var app = express();
var request = require("request");




/*-------------fonction--------------------*/


//return an array of objects according to key, value, or key and value matching
function getObjects(obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, val));
        } else
            //if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
            if (i == key && obj[i] == val || i == key && val == '') { //
                objects.push(obj);
            } else if (obj[i] == val && key == '') {
                //only add if the object is not already in the array
                if (objects.lastIndexOf(obj) == -1) {
                    objects.push(obj);
                }
            }
    }
    return objects;
}

//return an array of values that match on a certain key
function getValues(obj, key) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getValues(obj[i], key));
        } else if (i == key) {
            objects.push(obj[i]);
        }
    }
    return objects;
}

//return an array of keys that match on a certain value
function getKeys(obj, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getKeys(obj[i], val));
        } else if (obj[i] == val) {
            objects.push(i);
        }
    }
    return objects;
}


/* API SUppression de la liste des salariés */
app.delete('/api/deleteall', function (req, res) {
    chaine = '{"data":[]}';
    fs.writeFileSync("data/salarie.json", chaine, "UTF-8");
    levelmessage = 'info';
    message = '';
    res.sendStatus(200)
});



/* API - Peuplemnt d'un jeu de test */
app.delete('/api/datatest', function (req, res) {
    chaine = '{"data":[{"id":"SAL1","name":"DURAND","lastname":"Pierre","salary":"12345","level":"3","time":1482963573074},{"id":"SAL2","name":"DUPOND","lastname":"René","salary":"34554","level":"-4","time":1482963592496}]}';
    fs.writeFileSync("data/salarie.json", chaine, "UTF-8");
    
    message = "Le fichier de salarié a été reinitialisé";
    res.status(200).send(message);
});


/* API - Recherche de salarié */
app.get('/api/rechercher', function (req, res) {
    //ouverture de la liste complete de salarié
    var listesalarie = JSON.parse(fs.readFileSync("data/salarie.json", "UTF-8"));


    if (req.query.mode == 'all') {
        res.json(listesalarie.data.sort(function(b, a) {
            return parseFloat(a.time) - parseFloat(b.time);
            })
        );
    }
    else {
        if (req.query.name) {
            var filtrelistesalarie = getObjects(listesalarie, 'name', req.query.name);
            //example of grabbing objects that match some key and value in JSON
            console.log(getObjects(listesalarie, 'name', req.query.name));
             res.json(filtrelistesalarie.sort(function(b, a) {
            return parseFloat(a.time) - parseFloat(b.time);
            })
        );
        }
        else {
            console.log('La requete est incorrecte');
            res.sendStatus(400)
        }
    }

});



/* API Ajout de salarié */
app.post('/api/ajouter', function (req, res) {

    var listesalarie = JSON.parse(fs.readFileSync("data/salarie.json", "UTF-8"));
    var nberr = 0

    //Traitement des cas d'erreur
    if ((req.query.salary && parseFloat(req.query.salary) < 0) || (req.query.salary && isNaN(req.query.salary))) { nberr++; message = 'Le salaire doit être un nombre positif'; }
    if ((req.query.level && Math.abs(parseFloat(req.query.level)) > 10) || (req.query.level && isNaN(req.query.level))) { nberr++; message = 'Le niveau doit être > -10 et < 10'; }
    if (req.query.id == '') {
        nberr++;
        message = 'Le matricule est obligatoire';
    }
    else {
        //Recherche de l'index 
        var index = -1;
        var filteredObj = listesalarie.data.find(function (item, i) {
            if (item.id === req.query.id) {
                index = i;
                return i;
            }
        });

        if (index != -1) {
            nberr++;
            message = 'Le matricule existe déjà';
        }
    }

    if (nberr == 0) {
        //Ajout du salarié dans la liste
        var horodate= new Date().getTime();
        listesalarie.data.push({ id: req.query.id, name: req.query.name, lastname: req.query.lastname, salary: req.query.salary, level: req.query.level, time: horodate });
        // Enregistrement dans la persistance
        chaine = JSON.stringify(listesalarie);
        fs.writeFileSync("data/salarie.json", chaine, "UTF-8");
        message = "Le salarié a bien été ajouté";
        res.status(201).send(message);
    }
    else {
        console.log(message);
        res.status(409).send(message);
    }
});

/* API Modification de salarié */
app.post('/api/modifier', function (req, res) {

    var listesalarie = JSON.parse(fs.readFileSync("data/salarie.json", "UTF-8"));
    var nberr = 0

    //Traitement des cas d'erreur
    if ((req.query.salary && parseFloat(req.query.salary) < 0) || (req.query.salary && isNaN(req.query.salary))) { nberr++; message = 'Le salaire doit être un nombre positif'; }
    if ((req.query.level && Math.abs(parseFloat(req.query.level)) > 10) || (req.query.level && isNaN(req.query.level))) { nberr++; message = 'Le niveau doit être > -10 et < 10'; }
    if (req.query.id == '') {
        nberr++;
        message = 'Le matricule est obligatoire';
    }
    else {
        //Recherche de l'index 
        var index = -1;
        var filteredObj = listesalarie.data.find(function (item, i) {
            if (item.id === req.query.id) {
                index = i;
                return i;
            }
        });

        if (index == -1) {

            nberr++;
            message = 'Le matricule n\' a pas été trouvé';
        }
    }

    if (nberr == 0) {
        //Suppression du salarié dans la liste
        listesalarie.data.splice(index, 1);
        //Ajout du salarié dans la liste
        var horodate= new Date().getTime();
        listesalarie.data.push({ id: req.query.id, name: req.query.name, lastname: req.query.lastname, salary: req.query.salary, level: req.query.level, time: horodate  });
        // Enregistrement dans la persistance
        chaine = JSON.stringify(listesalarie);
        fs.writeFileSync("data/salarie.json", chaine, "UTF-8");
        message = "Le salarié a bien été modifié";
        res.status(200).send(message);
    }
    else {
        console.log(message);
        res.status(409).send(message);
    }
});



/* API Suppression d'un salarié */
app.delete('/api/supprimer', function (req, res) {
    if (req.query.id != '') {
        console.log('Suppression du matricule '+req.query.id+' en cours');
        var listesalarie = JSON.parse(fs.readFileSync("data/salarie.json", "UTF-8"));
        //Recherche de l'index correspondant au salarié à supprimer.
        var index = -1;
        var filteredObj = listesalarie.data.find(function (item, i) {
            if (item.id === req.query.id) {
                index = i;
                return i;
            }
        });

        //console.log('Salarié trouvé ' + index, filteredObj);

        if (index == -1) {
            message = 'le salarié n\'a pas été trouvé';
            res.status(400).send(message);
            console.log('pas de matricule trouvé')
        }
        else {
            //Suppression du salarié dans la liste si on troyve bien un id
            listesalarie.data.splice(index, 1);
            // Enregistrement dans la persistance
            chaine = JSON.stringify(listesalarie);
            fs.writeFileSync("data/salarie.json", chaine, "UTF-8");
            message = 'Le salarié a bien été supprimé';
            res.status(200).send(message);
             
        }
    }

    else {
        message = 'le salarié n\'a pas été trouvé';
        res.status(400).send(message);
        console.log('pas de matricule trouvé');
    };

})



app.use(morgan('tiny')) // Active le middleware de logging
    .use(express.static(__dirname + '/public')) // Indique que le dossier /public contient des fichiers statiques (middleware chargé de base)
    .use(express.static(__dirname + '/docs/')) // Indique que le dossier /public contient des fichiers statiques (middleware chargé de base)
    .use(function (req, res) { // Répond enfin
        res.status(404).send('Page introuvable !');
    
    });




// ... Tout le code de gestion des routes (app.get) se trouve au-dessus

app.use(function (req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !');
});




//ecoute du port 
app.listen(port);

console.log('démarrage application API sur le port ' + port);