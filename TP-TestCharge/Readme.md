# TP - Construire son premier test de montée en charge

Dans ce TP, on cherche à vérifier que l'application respecte les exigences de performance, notamment lorsque l'application est soumise à une charge d'utilisateurs importante. On va donc enregistrer un scénario utilisateur puis le travailler pour être en mesure de simuler une injection similaire à une charge réelle.

Aujourd'hui, nous utiliserons l'outil Jmeter qui permet d'enregistrer des séquences de requetes issues d'actions effectuées par un utilisateur, d'y ajouter des points de contrôles (présence d'un message d'erreur, code Http de réponse) et de les rejouer en masse afin d'assurer la bonne tenue en charge de l'application sous test.

L’objectif du TP est de manipuler un outil de tests de montée en charge (Jmeter dans notre cas) et de s’approprier une méthode pour effectuer des tirs de test de charge.

Les tirs de charge sont effectués sur l’application RhTest créée pour les besoins du TP.

## Livrable
L’étudiant devra présenter, dans le dossier de tests, les résultats du test de charge commentés par ses analyses sur chacun des graphiques présentés afin de montrer la bonne exécution du test de charge ou au contraire montrer les défaillances constatées.
Aussi, vous devrez construire le graphique qui permet de montrer la montée en charge en comparant les résultats obtenus à 1-5-10-30 utilisateurs simultanés.
Le Jmx (fichier de travail de Jmeter) sera à fournir à la fin du TP.

## Pré requis

 1. Installation de l'application RhTest
 2. Disposer du référentiel d'exigences avec le ou les exigences de performance
 3. Installer L’outil Jmeter (http://jmeter.apache.org/) disponible à l’adresse :
http://jmeter.apache.org/download_jmeter.cgi. En date de préparation du TP, la version est la 5.2.1
Installer les Jmeter plugins. Ils sont disponibles à l’adresse https://jmeter-plugins.org/wiki/PluginsManager/, en téléchargeant je jar disponible sur https://jmeter-plugins.org/get/
et en le copiant dans le dossier lib/ext
4. Lancer Jmeter.bat (ou jmeter.sh) selon le système d’exploitation utilisé puis aller dans Options/Plugins Manager et cocher dans les plugins disponibles jpgc – Standard set et Composite Timeline Graph.

Notre environnement Jmeter est prêt, on peut donc procéder à l’initialisation de notre capture

## Méthodologie :
1. Rédiger le scénario prévu pour le test de montée en charge et définir le modèle d'injection:
*  Ouvrir l’application
* Ajouter un salarié
* Rechercher un salarié par son nom
* Modifier un salarié
2. Enregistrer le scénario de tests
3. Epurer le scénario
4. Utiliser la variabilisation
5. Utiliser l’assertion des résultats
6. Effectuer les tirs d’l’injection

## Guide méthodologique d'utilisation de Jmeter.

### Préparer son envrionnement de tests

Sur le Plan de tests, créer un groupe d’unité, c’est lui qui nous permettra de configurer le nombre
d’utilisateurs conformément au modèle d’injection.

![Jmeter Groupe unité](/docs/Jmeter-Unite.png)

Ajouter Plan de test > Configurations > Paramètre http par défaut et renseigner le nom et le port (http://locahost et 8085 si vous utilisez les paramètres par défaut)


![Jmeter Localhost](/docs/Jmeter-localhost.png)


Nous allons également ajouter les récepteurs, qui nous permettront de récupérer les résultats lors de
l’injection en charge :
* Ajouter Plan de test > Récepteurs > Arbre de résultats
* Ajouter Plan de test > Récepteurs > jp@gc - Active threads over time
* Ajouter Plan de test > Récepteurs > jp@gc - Response time over time
* Ajouter Plan de test > Récepteurs > jp@gc – Composite Graph
* Ajouter Plan de test > Récepteurs > Rapport consolidé


### Enregistrement des requêtes utilisateurs

Notre environnement de travail est bien configuré, on peut passer à l’enregistrement du scénario de
test. 

Le scénario correspond aux enchainements d’actions que fait l’utilisateur (en fait c’est l’envoi des
requêtes uniquement, car on ne voit pas toutes les interactions de l’utilisateur).
JMeter propose une fonctionnalité « proxy » qui permet d’enregistrer une navigation. Tous les appels
http passant entre le client et le serveur sont récupérés, facilitant ainsi l’écriture du scénario. A noter,
ce même scénario aurait pu être écrit manuellement.
Jmeter écrit ainsi une séquence unitaire qu’il faudra ensuite tirer en simulant plusieurs sessions


Ajouter Plan de travail > Eléments hors test > Enregistreur de script de test http(s).

![Jmeter enregistr](/docs/Jmeter-enregistr.png) 


Mettre le port 8888 et un contrôleur cible sur Plan de test > Groupe d’unités de telle sorte que
l’ensemble des échantillons capturés peuple le plan de test.

![Jmeter Proxy](/docs/Jmeter-proxy.png) 

Lancer le proxy :

![Jmeter Proxy](/docs/Jmeter-proxy2.png) 

Dans Firefox, configurer un proxy sur le port 8888.

![Jmeter Firefox](/docs/Jmeter-Firefox.png) 


Dans Firefox, effectueur son scénario cible, puis arrêter le serveur Proxy (enregisteur de script de test
http).
Vérifier l’enregistrement du scénario. (vous devez voir apparaitre des pages dans le groupe d’unité.)

![Jmeter Scenario](/docs/Jmeter-scenario.png)

### Epuration du scénario
A cette étape, il est nécessaire d’épurer le scénario. Nous avons en effet enregistré aussi tous les
appels vers des fichiers ico, png… Si votre scénario est complet, supprimez les requêtes superflues,
sinon, vous pouvez encore affiner l’enregistrement en excluant ces fichiers :
Dans l’enregistreur de script de test, ajouter le motif à exclure suivant :
(?i).*\.(bmp|css|js|gif|ico|jpe?g|png|swf|woff)

Réinitialiser votre base de données à l’aide du bouton : ![Jmeter Poubelle](/docs/Jmeter-poubelle.png)

### Execution du scénario
Essayer maintenant d’exécuter un premier tir en prenant soin de vérifier les paramètres suivants :
1 utilisateur et 1 cycle (itération). Le lancement s'effectue avec le bouton :  ![Jmeter Execute](/docs/Jmeter-execute.png)

![Jmeter Epur](/docs/Jmeter-epur.png)

Visualiser le résultat dans l’arbre de résultat. (en configurant une sortie en html vous pouvez visualiser
la réponse obtenue.

![Jmeter Result html](/docs/Jmeter-resulthtml.png)

Essayer à nouveau de relancer le tir en cliquant directement sur e bouton de rejeu ![Jmeter Execute](/docs/Jmeter-execute.png) afin d’ajouter un nouvel
utilisateur puis vérifier le résultat et ouvrer l’application.
Vous devez constater que le scénario semble OK, tout est vert… 

Que se passe t’il puisque vous avez entré 2 salariés et vous n’en voyez qu’un ?… 

Le risque ici est d’avoir un scénario qui passe à OK dans Jmeter, sans qu’aucune donnée ne soit insérée (exemple du doublon qui est peut être traité correctement par des réponses du serveur et pourtant aucune donnée n’est injectée en base sur une demande d’ajout de salarié. C’est pourquoi il est nécessaire de s’assurer de la bonne exécution du scénario et de vérifier les résultats. On parle de blindage de test. Il consiste ici à ajouter une assertion réponse. Nous allons récupérer un message de
retour nous indiquant de la bonne exécution fonctionnelle en complément de la bonne exécution
technique. Dans les faits, si le salarié existe déjà, on affiche le matricule existe déjà. Nous allons vérifier l’absence de message dans le code html.

### Les assertions
Ajouter sous l’action /salarie une assertion Assertion réponse :
![Jmeter assert](/docs/Jmeter-assert.png)

Vider la base et effectuer à nouveau 2 insertions l’une à la suite de l’autre. A notre à ce niveau que la
touche ![Jmeter balai](/docs/Jmeter-balai.png) permet de supprimer les logs.
Vous devez obtenir une première exécution correcte puis une seconde en erreur :

![Jmeter Jmeter-resulterreur](/docs/Jmeter-resulterreur.png) 

Nous venons de blinder notre test ! En effet en cas de doublon on saura la détecter comme une anomalie.

Pour éviter les problèmes d’injection de doublons. Nous devons désormais nous arranger pour variabiliser la donnée de telle sorte que l’on puisse injecter plusieurs salariés. Plusieurs techniques existent (utilisation d’un compteur par exemple). Dans notre cas, on vient externaliser la données à injecter afin de pouvoir manipuler un lot de données plutôt que de la donnée statique qui peut parfois poser problème (exemple le doublon).


Nous allons utiliser la source données csv. Pour cela, rendez vous sur un générateur de données : Generatedata.com et construisez votre donnée.

![Jmeter Jmeter-generatedata](/docs/Jmeter-generatedata.png) 


### Variabiliser les données

Poser le résultat dans un fichier csv en prenant soin de supprimer la 1ere ligne et renouveler
l’opération pour peupler votre csv.

Dans Jmeter, ajouter sur le plan de test :

![Jmeter Jmeter-Jmeter-csv](/docs/Jmeter-csv.png) 

Créer une source de données CSV contenant MATRICULE, NOM, PRENOM SALAIRE et NIVEAU

![Jmeter Jmeter-Jmeter-csv2](/docs/Jmeter-csv2.png) 

Sur l’action ajout (mais aussi de recherche et modification, modifier les valeurs par les paramètres identifiés dans votre fichier CSV :

On vient ici variabiliser les données. Dans certains cas nous sommes également obligés de récupérer la donnée fournie par le serveur dans notre scénario afin de le réinjecter (exemple des sessions, ou cookies).

La donnée fixe est alors transformée par sa variable qui sera allouée en fonction des données à injecter.

La variable se nomme alors pour le nom par exemple : ${NOM}


![Jmeter Jmeter-Jmeter-variabilisation](/docs/Jmeter-variabilisation.png) 

Relancer le test et vérifier dans l’application de bon enregistrement des données insérées (Lancer un tir avec 1 utilisateur et 5 itérations), vérifier dans l’arbre de résultat la bonne exécution du script et
dans votre application la présence des résultats.

### Les pauses
Une dernière petite chose, pour le moment lorsque vous injectez vos données, c’est extrêmement rapide, nous allons ajouter les temps de réflexion et de saisie utilisateurs en ajoutant artificiellement des temps de pause :

![Jmeter Jmeter-Jmeter-pause](/docs/Jmeter-pause.png)

A noter : Vous retrouvez les résultats de tests de charge dans le rapport consolidé ainsi que dans le graph composite que vous aurez configuré sur: 

![Jmeter Jmeter-Jmeter-graph](/docs/Jmeter-graph.png)

Vous avez toutes les informations nécessaires lancer les tirs (exemple 1 – 5 - 10 – 30) et analyser les
résultats en les comparant entre eux. Fournissez les valeurs statistiques et graphiques de montée en
charge. N’oubliez pas de fournir le jmx (fichier jmeter), ainsi que de compléter les infos vues ci-dessus
sur les autres requêtes, tout comme l’assertion montrée ci-dessus doit être complétée par une ou
plusieurs assertions plus robustes.
