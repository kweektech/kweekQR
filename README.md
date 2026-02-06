# KweekQR - Générateur de codes QR avancé

Une application web moderne pour créer des codes QR personnalisés avec de nombreuses options de design et de contenu.

## 🚀 Fonctionnalités

### Types de QR Code (23 types)
- **Website** - Liens vers des sites web
- **Text** - Texte libre
- **PDF** - Liens vers des documents PDF
- **Images** - Liens vers des images
- **vCard** - Cartes de visite numériques
- **Video** - Vidéos YouTube
- **Wi-Fi** - Connexion Wi-Fi
- **Email** - Emails avec sujet et message
- **WhatsApp** - Messages WhatsApp
- **SMS** - Messages texte
- **Business** - Infos commerciales
- **Menu** - Menus de restaurant
- **Coupon** - Codes de réduction
- **Product** - Pages produits
- **App** - Stores d'applications
- **MP3** - Musique/Audio
- **Landing** - Pages d'atterrissage
- **Event** - Événements
- **Feedback** - Formulaires de feedback
- **Playlist** - Playlists musicales
- **Links** - Listes de liens
- **vCard+** - vCard étendu
- **Social** - Réseaux sociaux

### Personnalisation
- **6 Styles de forme**: Square, Rounded1, Rounded2, Rounded3, Rounded4, Dots
- **Couleurs**: QR et fond (avec aperçu hex)
- **Logo**: Upload, redimensionnement (1-300%), espacement
- **Fond transparent**: Support PNG transparent
- **Gradient**: Couleur dégradée pour le QR
- **8 Cadres design**: Aucun, Enveloppe, Écran, Main, Laptop, Mug, Scooter, Bannière
- **Niveaux correction erreur**: L, M, Q, H

### Téléchargement & Export
- **Formats**: PNG, PDF, SVG
- **Actions**: Download, Copy, Share, Print
- **Templates**: Sauvegarde en JSON

## 📋 URLs Par Défaut

L'application utilise des URLs réelles et valides pour éviter les erreurs 404:

| Type | URL Par Défaut |
|------|---|
| Website | https://www.google.com |
| PDF | https://www.w3.org/WAI/WCAG21/Techniques/pdf/pdf-table.pdf |
| Images | https://www.w3schools.com/css/img_5terre.jpg |
| Video | https://www.youtube.com/watch?v=dQw4w9WgXcQ |
| Product | https://www.amazon.com |
| App | https://www.google.com/play |
| MP3 | https://www.youtube.com/watch?v=dQw4w9WgXcQ |
| Landing | https://www.google.com |
| Feedback | https://forms.google.com |
| Playlist | https://www.youtube.com/watch?v=dQw4w9WgXcQ |

## 🚀 Installation

```bash
npm install
npm run dev
```

L'application démarre sur `http://localhost:3002`

## 🔧 Build

```bash
npm run build
```

## 💡 Comment Utiliser

### Créer un QR Code Simple
1. Sélectionnez le type "Website"
2. Entrez votre URL
3. Cliquez sur "Download QR"

### Ajouter un Logo
1. Cochez "Add logo to QR"
2. Sélectionnez une image
3. Ajustez la taille (1-300%)
4. Ajustez l'espacement (0-20px)
5. Visualisez l'aperçu

### Appliquer un Design
1. Choisissez un style de forme (6 options)
2. Sélectionnez les couleurs
3. Optionnel: ajoutez un cadre (8 styles)
4. Optionnel: activez le gradient

### Télécharger
- **PNG** - Format standard
- **PDF** - Document A4
- **SVG** - Vecteur scalable

## 📱 Types de Contenu

### Wi-Fi
Entre le nom du réseau (SSID), le mot de passe et le type de sécurité (WPA/WEP/Aucun)

### Email
Entre l'email destinataire, le sujet et le message

### WhatsApp
Entre le numéro de téléphone et le message

### vCard
Entre vos informations de contact (nom, email, téléphone, entreprise, etc.)

### Liens (Link List)
Créez une liste de liens avec titres et URLs personnalisés

## ✨ Fonctionnalités Avancées

- **Copy to Clipboard** - Copie le QR dans le presse-papiers
- **Share** - Partage natif ou popup
- **Print** - Impression directe
- **Reset** - Réinitialise tous les paramètres
- **Save Template** - Exporte les paramètres en JSON
- **Dynamic QR** - Pour suivi des scans (À venir)

## 🎨 Niveaux de Correction d'Erreur

- **L** - 7% de correction (capacité maximale)
- **M** - 15% de correction (défaut)
- **Q** - 25% de correction
- **H** - 30% de correction (capacité minimale)

Un niveau plus élevé = QR plus petit = Moins de données perdable

## 📊 Statistiques

- **23** types de QR Code
- **6** styles de forme
- **8** cadres design
- **3** formats téléchargement
- **4** niveaux correction
- **7** boutons d'action
- **∞** possibilités de personnalisation!

## 🛠️ Technologies

- React + TypeScript
- Vite
- Tailwind CSS
- QR Code Styling
- jsPDF
- Lucide Icons

## 📄 Licence

MIT

## 👨‍💻 Support

Pour toute question ou problème, veuillez contacter le développeur.

---

**KweekQR** - Créez des codes QR magnifiques et fonctionnels! 🎉
# kweekQR
