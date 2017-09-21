# rhtest

Les TP concernant le test nécessitent l'application mise sous test appelée RhTest disponible dans les documents ci dessous. Pour faciliter les travaux en séance, vous devrez vous munir de votre ordinateur portable en disposant des droits d'accès administrateur sur celui-ci. L'exécution de l'application nécessite de disposer de nodeJs. Les explications ci dessous sont données à titre indicatif pour une installation sous Windows. L'installation est également possible sous Linux (ubuntu), non décrit dans cet article. 

## Préparation
Si nodeJs n'est pas installé sur votre poste, veuillez passer par l'installation: https://nodejs.org/en/

Installer la version 6.9.4 (LTS) par défaut

Installer Git Bash depuis https://git-for-windows.github.io/ en mode par défaut

Redémarrer votre poste après installation

Après redémarrage, lancer git bash et vérifier la version de node

Créer un répertoire c:/test

Se positionner dans le répertoire test et récupérer le code de l'application à mettre sous test:

``` git clone https://github.com/labarretony/rhtest.git ```

Cette application est composée d'un backend disponible dans rhapi et d'un front disponible dans rhfront

## Démarrage du Backend

Lancer un nouveau terminal Git bash et se positionner dans le répertoire rhapi puis exécuter:

``` 
cd /c/test/rhtest/rhapi/
npm install
npm start 
```

Vous devez obtenir le message : Démarrage de l'application sur le port 8086.
A noter que si votre port 8086 est déjà occupé, vous pouvez changer la configuration dans le fichier package.json.

## Démarrage de l'application Frontend

Ouvrez le fichier c:\test\rh\rhfront\package.json et modifier l'url 
```
"config":
        { "port" : "8085",    -- port d'écoute de votre application front end
          "api": "http://rhapi:8086"   -- URL de l'api démarrée dans le paragraphe précédent, si vous travailler en local, l'url sera http://localhost:8086
        }
```
 A noter que si vous travaillez uniquement en local, il est nécessaire de modifier de nom rhapi par localhost.
 
Démarrer un nouveau terminal Git bash puis exécuter la commande
``` 
cd /c/test/rhtest/rhfront/
npm install
npm start 
```


Tester le démarrage de l'application en ouvrant un navigateur (firefox ou chrome): http://localhost:8085
