# Comment modifier un document (UX Bible, Design System ou autre)

Les documents longs de ce projet (Product & UX Bible, Design System) sont structurés de façon modulaire :

- Chaque chapitre est un fichier Markdown séparé (ex. : `00_Executive_Summary.md`, `01_Vision_Produit.md` …).
- Un fichier **Table des matières** (`TOC.md`) liste les chapitres dans l’ordre d’apparition.
- Le document final est généré en concaténant le titre, la table des matières puis tous les chapitres, séparés par une ligne de séparation (`---`).

## Étapes pour modifier un document

1. **Identifier le chapitre à modifier**
   - Les chapitres sont situés dans le sous‑dossier approprié :
     - Product & UX Bible : `docs/product_ux_bible/`
     - Design System : `docs/design_system/`
   - Chaque fichier de chapitre commence par un numéro à deux chiffres suivi d’un underscore et du titre (ex. : `06_Parcours_Client.md`).

2. **Éditer le chapitre**
   - Ouvrez le fichier correspondant avec votre éditeur de texte préféré.
   - Apportez les modifications nécessaires.
   - Enregistrez le fichier.

3. **Mettre à jour la table des matières (si nécessaire)**
   - Si vous avez ajouté, supprimé ou renommé un chapitre, vous devez mettre à jour `TOC.md` situé dans le même sous‑dossier que les chapitres.
   - `TOC.md` contient une liste de lignes de la forme :
     ```
     ## <Numéro> <Titre du chapitre>
     - Puce 1
     - Puce 2
     ...
     ```
   - Ajoutez, retirez ou modifiez les entrées pour refléter les changements.
   - Conservez la même hiérarchie de titres (H2 pour les chapitres principaux).

4. **Re‑générer le document final**
   - Depuis la racine du projet (`/home/germain/MyProjects/relio/`), exécutez la séquence de commandes suivante (adaptée au document concerné) :

### Exemple : Product & UX Bible
```bash
# Aller à la racine du projet
cd /home/germain/MyProjects/relio

# Créer/vider le fichier final
echo "# Product & UX Bible

*Document de référence produit de Relio — Version 1.0*

" > Product_UX_Bible.md

# Ajouter la table des matières
cat docs/product_ux_bible/TOC.md >> Product_UX_Bible.md
echo -e "\n---\n" >> Product_UX_Bible.md

# Concaténer tous les chapitres dans l'ordre
for i in {00..13}; do
    cat docs/product_ux_bible/${i}_*.md >> Product_UX_Bible.md
    echo -e "\n---\n" >> Product_UX_Bible.md
done
```

### Exemple : Design System
```bash
cd /home/germain/MyProjects/relio

echo "# Design System Relio

*Document de référence du système de design de Relio — Version 1.0*

" > Design_System.md

cat docs/design_system/TOC.md >> Design_System.md
echo -e "\n---\n" >> Design_System.md

for i in {00..15}; do
    cat docs/design_system/${i}_*.md >> Design_System.md
    echo -e "\n---\n" >> Design_System.md
done
```

   - Le résultat sera un fichier Markdown unique (`Product_UX_Bible.md` ou `Design_System.md`) situé à la racine du projet.
   - Vous pouvez ensuite le déplacer ou le commiter selon vos besoins.

5. **Vérifier le rendu**
   - Ouvrez le fichier généré pour vous assurer que la mise en forme est correcte (pas de doublons, séparateurs en place, numérotation cohérente).
   - Si vous utilisez un outil de prévisualisation Markdown (ex. : VS Code, typora, ou un rendu GitHub), vérifiez que les titres, les listes et les tableaux apparaissent comme attendu.

6. **Commit les modifications**
   - Ajoutez les fichiers de chapitre modifiés, le `TOC.md` mis à jour et le document final régénéré à votre commit Git.
   - Exemple :
     ```bash
     git add docs/product_ux_bible/06_Parcours_Client.md
     git add docs/product_ux_bible/TOC.md
     git add Product_UX_Bible.md
     git commit -m "Mettre à jour le chapitre 6 du UX Bible : ajouter les cas d'erreur de paiement"
     ```

## Bonnes pratiques

- Toujours travailler sur le chapitre individuel plutôt que sur le document final assemblé ; cela évite les conflits et facilite la revue.
- Après chaque modification, regénérez le document final pour vous assurer que la table des matières et les séparateurs sont à jour.
- Gardez les séparateurs (`---`) entre les chapitres exactement comme dans le modèle fourni ; ils permettent une séparation claire lors de la conversion en PDF ou en impression.
- Si vous ajoutez un nouveau chapitre, choisissez le prochain numéro disponible (ex. : après `13_Glossaire.md` vous pourriez ajouter `14_Annexes.md`) et mettez à jour la table des matières en conséquence.
- Ne modifiez jamais directement le document final (`Product_UX_Bible.md` ou `Design_System.md`) sans mettre à jour les sources, sinon vos modifications seront perdues lors de la prochaine régénération.

## Résumé des commandes utiles

| Action | Commande (exemple) |
|--------|--------------------|
| Lister les chapitres | `ls docs/product_ux_bible/[0-9][0-9]_*.md` |
| Voir un chapitre | `cat docs/product_ux_bible/06_Parcours_Client.md` |
| Mettre à jour le TOC | Éditer `docs/product_ux_bible/TOC.md` avec votre éditeur |
| Régénérer le UX Bible | Voir le bloc de script ci‑dessus |
| Régénérer le Design System | Voir le bloc de script ci‑dessus |
| Vérifier le nombre de lignes du document final | `wc -l Product_UX_Bible.md` |

En suivant cette procédure, vous garantissez que tous les documents restent cohérents, que la table des matières reflète toujours le contenu réel et que le document final peut être généré à tout moment depuis les sources.

---  
*Ce guide vaut pour tout autre document suivant la même modélisation (titre + TOC + chapitres). Il suffit d’adapter les chemins et les plages de numéros.*  
