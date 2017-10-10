# TP - Construire son premier test fonctionnel automatisé

Ce TP a pour objectif de réaliser un test fonctionnel automatisé de l'application RhTest.

Nous utiliserons l'outil Selenium qui permet de réaliser d'enregistrer des séquences d'actions (clic, saisie clavier), d'y ajouter des points de contrôles (présence d'un message d'erreur, ajout d'un utilisateur dans un tableau) et de les rejouer à volontée afin d'assurer la non regression de l'application sous test.

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
   - Onglet `Mise à jour`
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
 
## Travail à réaliser

> WIP

## Ressources complémentaires

Site du projet Selenium Ide: http://seleniumhq.org/projects/ide/