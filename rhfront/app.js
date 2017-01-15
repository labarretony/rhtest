/*     Modifier le port si necessaire     */
var port = process.env.npm_package_config_port;
var servapi= process.env.npm_package_config_api;

var express = require('express');
var morgan = require('morgan'); // Charge le middleware de logging
var favicon = require('serve-favicon'); // Charge le middleware de favicon
var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var fs = require("fs");
var message = '';
var levelmessage = '';
var filteredObj = '';
var nbsalaries='';
var app = express();
var request = require("request");

/* -----------------interface utilisateur---------------------------------------*/

//Affichage de la liste des salariés
app.get('/', function (req, res) {
    res.redirect('/salarie');
});


//Affichage de la liste des salariés
app.get('/salarie', function (req, res) {
 console.log(servapi);
 console.log('url:'+ req.headers.host);
var requete = servapi+'/api/rechercher?mode=all';
        console.log('requete: ' + requete);

    request(requete, function (error, response, body) {
        data = JSON.parse(body);
        nbsalaries= data.length;
        console.log('nombre salaries: ' + nbsalaries);
        res.render('salarie.ejs', { data: data, message: message, levelmessage: levelmessage, nbsalaries: nbsalaries, servapi:servapi });
    });
});

/* On ajoute un élément à la liste de salarié */
app.post('/salarie/ajouter/', urlencodedParser, function (req, res) {
    
    levelmessage = '';
    message = '';
    var nberr = 0


    if (req.body.OP == "Ajouter") {
        var requete = servapi+'/api/ajouter?id=' + req.body.newid + '&name=' + req.body.newsalarie + '&lastname=' + req.body.newlastname + '&salary=' + req.body.newsalary + '&level=' + req.body.newlevel;
        console.log('requete: ' + requete);
        request.post(requete, function (error, response, body) {
            console.log('APpel API Ajout de salarié');
            console.log('reponse: ' + response.statusCode);
            if (response.statusCode != 201) { levelmessage = 'alert'; message =body} else { levelmessage = 'info';  message =body; };
            console.log('message:'+ message);
            res.redirect('/salarie');
        });


    }
    else {
        //Cas de la modification de salarié
        console.log('Modification de salrié');
        var requete = servapi+'/api/modifier?id=' + req.body.newid + '&name=' + req.body.newsalarie + '&lastname=' + req.body.newlastname + '&salary=' + req.body.newsalary + '&level=' + req.body.newlevel;
        console.log('requete: ' + requete);
        request.post(requete, function (error, response, body) {
            console.log('Appel Api modification de salarié');
            console.log('reponse: ' + response.statusCode);
            if (response.statusCode != 200) { levelmessage = 'alert'; message =body } else { levelmessage = 'info';   message =body;};
            res.redirect('/salarie');
        });


    }


});


/* Supprime un élément de la liste de salariés */
app.get('/salarie/supprimer/:id', function (req, res) {
    console.log('Appel de suppression id: '+req.params.id);
 
    var requete = servapi+'/api/supprimer?id=' + req.params.id;
    console.log('requete: '+requete);
    request.delete(requete, function (error, response, body) {
        console.log('Appel API suppression');
        console.log('message de retour: '+body);
        if (response.statusCode != 204) { levelmessage = 'alert';  message =body;} else { levelmessage = 'info';  message =body;};
        res.redirect('/salarie');
    })
});





/* Recherche un élément et affiche la liste de salariés */
/*encours de construction*/

app.post('/salariefiltre', urlencodedParser, function (req, res) {
    console.log('appel recherche de salarié : ' + req.body.rechsalarie);
    if (req.body.rechsalarie != '') {
        var requete = servapi+'/api/rechercher?name=' + req.body.rechsalarie;
        console.log('requete: ' + requete);
        request(requete, function (error, response, body) {
            console.log('APpel Api recherche de salariés');
            console.log('reponse: ' + response.statusCode);
            if (response.statusCode != 200) { levelmessage = 'alert'; } else { levelmessage = 'info'; };
            data = JSON.parse(body);
            console.log('nombre items: ' + data.length);
            if (data.length == 0) {
                message = 'Aucun salarié trouvé avec le nom ' + req.body.rechsalarie;
                levelmessage = 'alert';
            }
            else {
                message = 'Affichage filtré'
                levelmessage = 'info';
            }
            res.render('salarie.ejs', { data: data, message: message, levelmessage: levelmessage , nbsalaries: nbsalaries, servapi:servapi});
        });



    }
    else {
        //Rechargement de toute la page
        message = ''
        levelmessage = 'info';
        res.redirect('./salarie');
    }
});


//Page de suppression de la liste de tous les salariés
app.get('/deleteall', function (req, res) {
 
 
var requete = servapi+'/api/deleteall';
        console.log('requete: ' + requete);

    request.delete(requete, function (error, response, body) {
        message = 'Tous les salariés ont été supprimés'
        levelmessage = 'info';
        res.redirect('/salarie');
    });
});

//Page d'initialisation avec un jeu de données
app.get('/datatest', function (req, res) {
 
 
var requete = servapi+'/api/datatest';
        console.log('requete: ' + requete);

    request.delete(requete, function (error, response, body) {
        message = 'Les salariés ont été initialisés à partir du jeu de tests'
        levelmessage = 'info';
        res.redirect('/salarie');
    });
});


app.use(morgan('tiny')) // Active le middleware de logging
    .use(express.static(__dirname + '/public')) // Indique que le dossier /public contient des fichiers statiques (middleware chargé de base)
    .use(favicon(__dirname + '/public/favicon.ico')) // Active la favicon indiquée
    .use(function (req, res) { // Répond enfin
        res.send(404, 'Page introuvable !');





    });




// ... Tout le code de gestion des routes (app.get) se trouve au-dessus

app.use(function (req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.send(404, 'Page introuvable !');
});


//ecoute du port
app.listen(port);

console.log('api : ' + servapi);
console.log('démarrage application sur le port ' + port + " http://localhost:"+port);



if(!servapi){console.log('PROBLEME: Aucune APi est déclarée dans la ligne de commande');
process.exit()
    }
