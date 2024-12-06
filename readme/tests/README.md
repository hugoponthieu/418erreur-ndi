> **418Erreur** : Dorian Grasset - Benoit Planche - Pauline Contat - Dorian Têtu - Tristan-Mihai Radulescu - Hugo Ponthieu

# Nuit de l'info 2024

## [Mise en place de la qualité](https://www.nuitdelinfo.com/inscription/defis/437)

> Envoyer un mail à l'adresse suivante mn.francois@salviadeveloppement.com

Adresse du site : https://savenemo.do-2023.fr/

Adresse du repository GitHub : https://github.com/hugoponthieu/418erreur-ndi

---

### Test unitaire expliqué

#### Exemple détaillé : Test du composant Dialog

Le test du composant Dialog illustre comment tester un composant React complexe avec plusieurs scénarios :

1. **Rendu du Dialog ouvert**
   - Vérifie que les éléments textuels sont présents
   - Utilise `render()` de React Testing Library
   - Emploie `screen.getByText()` pour l'assertion

2. **Comportement du Dialog fermé**
   - Confirme que rien ne s'affiche quand `open={false}`
   - Utilise `screen.queryByText()` pour vérifier l'absence d'éléments

3. **Gestion de l'événement de fermeture**
   - Teste le déclenchement du callback `onOpenChange`
   - Simule un clic sur le bouton de fermeture
   - Vérifie que le gestionnaire est appelé une fois

### Campagne de tests décomposée en cahier de tests

#### Button Component

| Cas de test | Description | Résultat attendu | Statut |
|-------------|-------------|-----------------|--------|
| Rendu du texte | Vérifier l'affichage du texte du bouton | Texte présent | ✅ |
| Événement onClick | Déclenchement du gestionnaire de clic | Fonction appelée | ✅ |
| Bouton désactivé | Vérifier l'état disabled | Bouton non cliquable | ✅ |

#### Checkbox Component

| Cas de test | Description | Résultat attendu | Statut |
|-------------|-------------|-----------------|--------|
| Toggle de la case | Changement d'état du checkbox | Case cochée/décochée | ✅ |

#### Counter Slice

| Cas de test | Description | Résultat attendu | Statut |
|-------------|-------------|-----------------|--------|
| État initial | Vérifier la valeur initiale | Valeur = 0 | ✅ |
| Incrément | Augmentation de la valeur | +1 | ✅ |
| Décrément | Diminution de la valeur | -1 | ✅ |
| Incrément personnalisé | Augmentation par une valeur donnée | Valeur spécifiée | ✅ |

#### Dialog Component

| Cas de test | Description | Résultat attendu | Statut |
|-------------|-------------|-----------------|--------|
| Rendu Dialog ouvert | Affichage des éléments | Titre et description présents | ✅ |
| Dialog fermé | Absence d'affichage | Aucun élément visible | ✅ |
| Fermeture du Dialog | Déclenchement du callback | Fonction onOpenChange appelée | ✅ |

#### Gauge Component

| Cas de test | Description | Résultat attendu | Statut |
|-------------|-------------|-----------------|--------|
| Affichage tooltip | Survol du composant | Tooltip avec le label correct | ✅ |

### Méthodologie de transmission des anomalies pour correction

1. **Identification**
   - Capture d'écran de l'erreur
   - Description détaillée du problème
   - Étapes de reproduction

2. **Reporting**
   - Ouvrir un ticket GitHub avec le label "bug"
   - Assignation au développeur concerné
   - Prioritisation (bloquant, majeur, mineur)

3. **Suivi**
   - Commentaires explicatifs
   - Mise à jour du statut
   - Validation après correction