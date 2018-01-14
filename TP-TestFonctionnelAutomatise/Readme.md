# TP - Construire son premier test fonctionnel automatisé

Dans ce TP, on cherche à vérifier que l'application graphique respecte les besoins du clients. On va donc enregistrer des scénarios utilisateur qui permettront de détecter les erreurs mais aussi de valider les fonctionnalités corrects (elles doivent le rester).

Pour corriger les bugs, les développeurs seront ensuite amené à retravailler sur l'application. Pour les testeurs, l'automate permettra de rapidement revalider l'application sans intervention humaine. 

Aujourd'hui, nous utiliserons l'outil SideeX qui permet de réaliser d'enregistrer des séquences d'actions (clic, saisie clavier), d'y ajouter des points de contrôles (présence d'un message d'erreur, ajout d'un utilisateur dans un tableau) et de les rejouer à volonté afin d'assurer la non regression de l'application sous test.

![Copie d'écran de l'application RhTest](/docs/screenshot.png)

## Livrable

Le livrable de ce TP est un dossier de tests présentant :
- Les cas de test implémentés dans selenium et enregistrer au format HTML
- Les résultats du test fonctionnel commentés par les analyses de l’étudiant sur chacun des cas de tests
- Une conclusion sur les cas de test OK ou KO afin de montrer la bonne exécution du test fonctionnel ou de montrer les défaillances constatées.

## Pré requis

 1. Installation de l'application RhTest
 2. Disposer du référentiel d'exigences
 3. Installer le plugin Chrome ou Firefox SideeX depuis la page http://sideex.org/#download

 Une fois SideeX installé, l'outil est disponible dans les barres d'outils de  Chrome ou Firefox sur l'icone 

 ![Lancer SideeX](/docs/Sideex-Launch.png)

## Présentation de SideeX

SideeX est un outil simple et facile d’utilisation qui permet de capturer un scénario utilisateur puis de le rejouer.
Il permet de comprendre rapidement l'intérêt des tests fonctionnels automatisés.

Une fois enregistrés, ces tests peuvent être sauvegardés au format HTML par défaut. D'autres outils plus évolués permettent de prendre en charge des mangages Java, PHP, Javascript, etc. Les tests peuvent aussi être joués sur différents navigateurs Chrome, Firefox, ou sur les mobiles. Un export au format Katalon permet également d'effectuer des manipulations complémentaires. 

SideeX respecte le standard Selenium. Selenium Ide était jusque là très utilisé jusqu'aà la version 45 de Firefox. Il existe différents projets qui utilisent la technologie Selenium : 
 - Selenium IDE qui permet de comprendre les tests automatisés, 
 - [http://www.seleniumhq.org/projects/remote-control/](Selenium RC) qui permet de piloter différents navigateurs,
 - [http://www.protractortest.org](Protractor) pour tester les applications AngularJS,
 - et même des applications en ligne, comme [https://www.browserstack.com](BrowserStack), qui permettent aux développeurs web d'accéder à des fermes de navigateurs.


### Interface Graphique de SideeX

![Installation SideeX](/docs/Sideex-ExempleJeu.png.png)

Une fois démarré, l'interface SideeX se décompose en plusieurs sections

#### Barre d'outils

![Actions SideeX](/docs/SideeX-Outils.png)

La barre d'outils contient des boutons qui permettent de contrôler l'exécution des cas de tests et notamment la rapidité d'exécution.

![Actions  SideeX](/docs/SideeX-execution.png)

#### Volets Cas de Test

![Actions SideeX](/docs/SideeX_CasDeTest.png)

Dans ce volet, on organisera les cas de tests en fonction du référentiel d'exigences

#### Volets Détail du Cas de Test

![Detail SideeX](/docs/SideeX_DetailCasDeTest.png)

Ce volet permet de détailler chacune des actions de test et des points de contrôle.  En éxécution il permet également de suivre chacune des étapes de test et leur résultat.

#### Volets Résultats et log

![Detail SideeX](/docs/Sideex-Result.png)

Ce volet permet de consolider le nombre de test passant ou en échec. Le détail de l'éxécution se trouve quanà un lui dans un journal d'exécution en bas de la fenêtre SideeX.




 
## Travail à réaliser

 - Automatiser les exigences critiques d'abord,
 - Nommer les cas de test en fonction des codes d'exigences
 - Suivre le réferentiel d'exigence pour : 
   - enregistrer la séquence utilisateur
   - ajouter un point de contrôle
 - Rejouer le test de façon unitaire pour vérifier qu'il retourne le résultat attendu (OK si fonctionnalité correctement implémentée, KO si différence avec réferentiel exigence)  

Une fois que l'ensemble des exigences sont enregistrées, rejouer la séquence complète.

## Exemple

Voici un exemple d'enregistrement et de rejeu.

![Exemple Jeu](/docs/Sideex-ExempleJeu.png)

## Pour aller plus loin

En plus des commandes disponibles via l'enregistrement, SideeX peut utiliser les méthodes suivantes :

 - `open` : ouvre une page à l'aide d'une URL.
 - `clickAndWait` : effectue une opération de clic, et attend en option une nouvelle page à charger.
 - `verifyTitle`/`assertTitle` : vérifie le titre d’une page.
 - `verifyTextPresent` : vérifie la présence d’un texte quelque part sur la page.
 - `verifyElementPresent` : vérifie la présence d’un élément sur l’interface utilisateur, telle que définie
par sa balise HTML.
 - `verifyText/assertText` : vérifie que le texte attendu et sa balise HTML correspondante sont présents
sur la page. `verify` est non bloquant, alors que `assert` l'est.
 - `verifyTable` : vérifie les contenus attendus d'une table
 - `waitForPageToLoad` : suspend l'exécution jusqu'à ce qu'une nouvelle page attendue soit chargée.
Appelée automatiquement lorsque clickAndWait est utilisé.
 - `waitForElementPresent` : suspend l'exécution jusqu'à ce qu'un élément de l'interface telle que
définie par sa balise HTML, soit présent sur la page.


Ces commandes sont également disponibles depuis la page web, sur un clic droit. 
![Sideex Assert](/docs/Sideex-assert.png)

Ceci permet de faciliter la mise en place de point de contrôle. Attention toutefois à cette méthode qui semble rapide et pourtant peut engendrer des problème de qualité. En effet l'enregistrement des proints de controles présume que le logiciel mis sous test et en bon état de fonctionnement, ce qui n'est pas le cas dans notre cas de figure...