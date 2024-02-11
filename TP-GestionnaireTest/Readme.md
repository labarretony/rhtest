# TP - Travailler avec un gestionnaire de test

Dans ce TP, on cherche à outiller la gestion des exigences et des cas de test. Au delà de référencer les exigences et cas de test, il permet aussi d'organiser et piloter cette activité. 
En effet un outil permettra de connaitre plus facilement l'avancement de l'écriture des cas de test, distribuer les cas à exécuter entre différentes personnes, thématiser les cas, organiser les campagnes de test, mesurer l'avancement de l'exécution et faciliter la communication des résultats de test. 

Aujourd'hui, nous utiliserons l'outil Squash-tm, accessible et relativement facile d'utilisation, il permet de piloter de nombreux projets. Il est utilisé en entreprise. 

L’objectif du TP est de manipuler un outil de gestion de tests et suivre l'avancement de la campagne de test.


## Méthodologie et livrable

Vous avez travaillé sur les exigences et cas de test dans un tableur. Sur la base de ce fichier, vous allez implémenter les exigences et cas de tests dans Squashtm.
L’étudiant devra présenter, dans le dossier de tests, les résultats des tests à partir des graphiques fournis par l'outil.

 
## Pré requis

 1. Télécharger l'application https://www.squashtest.com/download-squash
 2. Décompresser l'archive.zip dans le répertoire de travail de votre choix
 3. Par défaut l'application est livrée avec une base H2 pour persister les données. Pour les besoins du TP nous resterons sur une base H2. Il est à noter qu'il existe d'autres bases de données plus robustes pour une exécution en production. 
Télécharger le fichier squash-tm.mv.db disponible dans le répertoire TP-Gestionnaire de test de ce repo et coller les dans le repertoire data (à la place de ceux par défaut). 
 4. lancer startup.bat disponible de le répertoire bin
 5. Attendez quelques secondes puis dans un navigateur, lancer http://localhost:8080/squash/login

A noter que si votre port 8080 est déjà occupé, vous pouvez le changer dans le fichier startup.bat

L'application doit s'ouvrir dans votre navigateur


## Guide d'utilisation 

1. Créer d'abord les exigences
	Positionnez vous sur le domaine Exigence puis cliquer sur ajouter une exigence.
	Remplissez les champs demandés. La zone description permet notamment de référencer ce que doit faire l'application, la fonctionnalité. 
2. Créer les cas de test dans un format classique
	Positionnez vous sur le domaine Cas de test puis cliquer sur ajouter un cas de test
	Remplissez les champs (a noter les pas de test seront décrit plus tard, dans notre TP, la zobe descriptif permet par exemple de mentionner votre objectif de test.
	Sur le cas de test, reliez votre cas à l'exigence en cliquant sur "Exigences vérifiées par ce cas de test"
	Sur le cas de test, positionnez vous sur Prérequis et pas de test, zone dans laquelle vous pourrez lister les étapes et les points de contrôle.

Renseignez tous vos cas de test
3. Créer une campagne de test
	Positionnez vous sur le domaine Exécution
	Cliquez sur Ajouter une campagne
	Positionnez vous sur la campagne et ajouter une itération
	Positionnez vous sur l'itération puis sur la droite de l'écran cliquer sur Plan d'exécution puis Associer les cas de test. 
	Organisez votre/vos campagne(s) (vous avez également la possibilité d'ajouter des suites de test).

4.  Lancer l'exécution de vos campagnes de test et renseigner la statut de chacun de vos tests.
5.  Récuperer les statistiques d'avancement de couverture et de succès sur la campagne de test. 
