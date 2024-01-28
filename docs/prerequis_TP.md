# Installation de l'application RHtest

## Préparation
1. Si NodeJs n'est pas installé sur votre poste, veuillez passer par l'installation: https://nodejs.org/en/. Installer la version 20.11.0 (LTS) par défaut

2. Installer Git Bash depuis https://git-for-windows.github.io/ en mode par défaut

3. Redémarrer votre poste après installation

4. Après redémarrage, lancer git bash et vérifier la version de NodeJs

5. Créer un répertoire c:/test

6. Se positionner dans le répertoire test et récupérer le code de l'application à mettre sous test:

`git clone https://github.com/labarretony/rhtest.git`

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
```json
"config": { 
  "port" : "8085",
  "api": "http://rhapi:8086"
}
```
 - `port` : port d'écoute de votre application front end
 - `api` : URL de l'api démarrée dans le paragraphe précédent. Si vous travailler en local, l'url sera http://localhost:8086
 
Démarrer un nouveau terminal Git bash puis exécuter la commande :
```
cd /c/test/rhtest/rhfront/
npm install
npm start 
```

Tester le démarrage de l'application en ouvrant un navigateur (firefox ou chrome): http://localhost:8085
