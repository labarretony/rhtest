# TP - Construire son premier test fonctionnel automatisé

Dans ce TP, on cherche à vérifier que l'application graphique respecte les besoins du clients. On va donc enregistrer des scénarios utilisateur qui permettront de détecter les erreurs mais aussi de valider les fonctionnalités corrects (elles doivent le rester).

Pour corriger les bugs, les développeurs seront ensuite amené à retravailler sur l'application. Pour les testeurs, l'automate permettra de rapidement revalider l'application sans intervention humaine. 

Aujourd'hui, nous utiliserons l'outil Selenium IDE qui permet de réaliser d'enregistrer des séquences d'actions (clic, saisie clavier), d'y ajouter des points de contrôles (présence d'un message d'erreur, ajout d'un utilisateur dans un tableau) et de les rejouer à volontée afin d'assurer la non regression de l'application sous test.

![Copie d'écran de l'application RhTest](/docs/selenium-ide.gif)

## Livrable

Le livrable de ce TP est un dossier de tests présentant :
- Les cas de test implémentés dans selenium et enregistrer au format HTML
- Les résultats du test fonctionnel commentés par les analyses de l’étudiant sur chacun des cas de tests
- Une conclusion sur les cas de test OK ou KO afin de montrer la bonne exécution du test fonctionnel ou de montrer les défaillances constatées.

## Pré requis

> Suite à la dernière version de Firefox, le plugin Selenium IDE n'est plus compatible. Il est donc nécessaire d'utiliser une version précédente de Firefox. Si le poste dispose déjà d'une version de Firefox, celle-ci devra donc être `downgradée` pour permettre la réalisation du TP. 

> Il faudra aussi temporairement désactiver l'installation automatique de la mise à jour de Firefox

> A l'issu de ce TP, la mise à jour de Firefox pourra se faire automatiquement si l'étudiant souhaite conserver ce navigateur.

 1. Télécharger la version `54` de Firefox depuis https://ftp.mozilla.org/pub/firefox/releases/54.0/
   - Windows : https://ftp.mozilla.org/pub/firefox/releases/54.0/win64/fr/Firefox%20Setup%2054.0.exe
   - Linux : https://ftp.mozilla.org/pub/firefox/releases/54.0/linux-x86_64/fr/firefox-54.0.tar.bz2
   - Mac : https://ftp.mozilla.org/pub/firefox/releases/54.0/mac/fr/Firefox%2054.0.dmg
 2. Désactiver les mises à jour automatiques de Firefox (penser à les réactiver après le TP)
   - Accéder à l'adresse `about:preferences#advanced`
   - Onglet ou Section `Mise à jour`
   - Cocher `Vérifier l'existence de mises à jour mais vous laisser décider de leur installation`
 3. Installer le plugin Selenium et Firefox depuis la page https://addons.mozilla.org/en-US/firefox/addon/selenium-ide/
 4. Démarrer de l'application RhTest
 5. Disposer du référentiel d'exigences

 ![Installation Selenium](/docs/install-selenium.png)

## Présentation de Selenium IDE

Selenium IDE est un outil simple et facile d’utilisation qui permet de capturer un scénario utilisateur puis de le rejouer.
Il permet de comprendre rapidement l'intérêt des tests fonctionnels automatisés.

Une fois enregistrés, ces tests peuvent être sauvegardés dans différents languages (HTML par défaut, Java, PHP, Javascript, etc). Les tests peuvent aussi être joués sur différents navigateurs (Chrome, Firefox, IE, Opéra, etc) ou sur les mobiles. 

Il existe différents projets qui utilise la technologie Selenium : 
 - Selenium IDE qui permet de comprendre les tests automatisés, 
 - [http://www.seleniumhq.org/projects/remote-control/](Selenium RC) qui permet de piloter différents navigateurs,
 - [http://www.protractortest.org](Protractor) pour tester les applications AngularJS,
 - et même des applications en ligne, comme [https://www.browserstack.com](BrowserStack), qui permettent aux développeurs web d'accéder à des fermes de navigateurs.

### Lancer Selenium IDE

Une fois Selenium installé, l'outil est disponible dans le menu de Firefox. Cette barre n’est pas visible par
défaut. Pour afficher la barre, appuyer sur la touche `alt`, puis cliquer sur `Outils` et enfin sur `Selenium IDE`

 ![Activer Selenium](/docs/activer-selenium.png)

### Interface Graphique de Selenium IDE

![Installation Selenium](/docs/Selenium_IDE.png)

Une fois démarré, l'interface Selenium se décompose en plusieurs sections

#### Barre d'outils

![Actions Selenium](/docs/Selenium_Actions.png)

La barre d'outils contient des boutons qui permettent de contrôler l'exécution des cas de tests

![Actions  Selenium](/docs/Selenium_ActionsExplain.png)

#### Volets Cas de Test

![Actions Selenium](/docs/Selenium_CasDeTest.png)

Dans ce volet, on organisera les cas de tests en fonction du référentiel d'exigences
 
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

![Actions Selenium](/docs/selenium_ide_exemple.gif)

## Pour aller plus loin

En plus des commandes disponibles via l'enregistrement, Selenium IDE peut utiliser les méthodes suivantes :

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
