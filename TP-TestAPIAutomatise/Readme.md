# TP: Tests des APi

L’objectif du TP est de découvrir le test des Api Rest.  

Une API permet d’exposer à des clients des méthodes et des objets de manière simple, mais le client
d’une API doit être assuré de la stabilité des signatures et du comportement pour une version
mineure donnée.

Il est donc intéressant de vérifier qu’une API reste stable et respecte son contrat d’interface dans le
temps. Pour cela il faut créer des tests fonctionnels et automatiser leur lancement pour qu’ils soient
exécutés lors de l’intégration continue.

SoapUI, en se basant sur les contrats, permet de créer rapidement de nouveaux cas
de tests, avant même que le travail de développement soit commencé (Contract First, Test Driven
Development).

Les assertions, points de contrôle, qui vérifient qu'un contrat est respecté s'attacheront à comparer
les codes de retours des appels, en commençant principalement par les cas nominaux (le cas
standard représentant 80% des appels effectués).

La variabilisation des données (Data Driven Testing) ainsi que le changement d'endpoint (cible)
permettent de rejouer facilement une suite de tests sur plusieurs environnements.

SoapUI permet de mettre en place une suite de tests qui peut être lancée d’une traite du côté client,
permet de tester les services web en mode bouchon mais aussi d’effectuer des tests de charge. Aussi,
Il dispose de plusieurs fonctionnalités qui font de lui un bon allié pour les développeurs et les
testeurs:

- Tests fonctionnels et de non régression,
- Tests de sécurité automatique,
- Test de charge - avec LoadUI,
- Mock d'un service
- Intégration au processus de build

Aller vite à l’essentiel en sortant de ce cours avec ces 3 ressources :

[getting-started](https://www.soapui.org/getting-started.html)

[features](https://www.soapui.org/open-source/features.html)

[testing-dojo](https://www.soapui.org/testing-dojo.html)

## Livrable

Le livrable de ce TP est un dossier de tests :
- Votre référentiel d'exigences
- Le Workspace SoapUI contenant les ressources demandées ainsi que les cas de test et leurs assertions.
- Les résultats du test fonctionnel commentés par les analyses de l’étudiant sur chacun des cas de tests
- Une conclusion sur les cas de test OK ou KO afin de montrer la bonne exécution du test fonctionnel ou de montrer les défaillances constatées.


## Pré requis

 1. Installation de l'application RhTest
 2. Disposer du référentiel d'exigences
 3. Installer SoapUI Open Source disponible [ici](https://www.soapui.org/downloads/soapui.html)  la version disponible ) ce jour est 5.7.0 

## Travail à réaliser

Vous êtes en charge des tests des API en ligne fournis avec l'application RhTest.

### Lancer SoapUI

#### Création du projet et des ressources à utiliser
Créer un nouveau projet vide et votre première ressource

![Gif créer ressources](/docs/ressources.gif)

#### Création d’une suite de test et d’un cas de test
Dans SoapUi, les tests sont décomposés en 3 niveaux : TestSuite, TestCase et TestStep.

- Une suite de test est une collection de cas de tests qui ciblent une même fonctionnalité ou qui ont une
unité logique.
- Un cas de test est une collection d’étapes de tests qui sont assemblées de manière à tester un aspect
du service.
- L’étape de test est donc le bloc de construction du test fonctionnel.

![Gif créer suite de test](/docs/testsuite.gif)

#### Les assertions

Exemple d'assertion :

Assert Status
![Gif status code](/docs/assert_status.gif)

Assert script
![Gif assert script](/docs/assert_script.gif)
```
import groovy.json.JsonSlurper
def response = messageExchange.response.responseContent
def slurper = new JsonSlurper()
def json = slurper.parseText response

assert json.size() == 2

```

```
import groovy.json.JsonSlurper
def response = messageExchange.response.responseContent
def slurper = new JsonSlurper()
def json = slurper.parseText response

assert json[0].id == 'SAL2'

```

Assert jsonPath
![Gif assert jsonPathCount](/docs/assert_jsonpath.gif)
![Gif assert jsonPath](/docs/assert_jsonpath2.gif)


#### La suite du TP

Réaliser tous les cas de tests correspondant à votre référentiel d'exigences.
