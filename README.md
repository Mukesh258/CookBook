# CookBook 🍲

**Cook smarter, eat better**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![GitHub stars](https://img.shields.io/github/stars/yourusername/cookbook.svg?style=social)](https://github.com/yourusername/cookbook/stargazers)

A modern, multilingual, animated recipe discovery website built with React. Discover recipes from around the world, save your favorites, and cook with interactive tools like ingredient checklists and timers.

## 📋 Table of Contents

- [✨ Features](#-features)
- [🚀 Quick Start](#-quick-start)
- [🛠️ Installation](#️-installation)
- [🌐 Browser Support](#-browser-support)
- [📁 Project Structure](#-project-structure)
- [🔌 API Usage](#-api-usage)
- [🔧 Troubleshooting](#-troubleshooting)
- [🛣️ Roadmap](#️-roadmap)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [🙏 Acknowledgments](#-acknowledgments)

## ✨ Features

### 🔍 Recipe Discovery
- 🔎 Search recipes by name, ingredient, or cuisine using TheMealDB API
- 🏠 Default homepage shows popular Indian recipes
- 🎲 "Recipe of the Day" widget with random recipes
- 🏷️ Filter by dietary restrictions (vegetarian, vegan, gluten-free)

### 📄 Recipe Details
- 📋 Complete recipe information with ingredients and instructions
- ✅ Interactive ingredient checklist
- 🕒 Built-in cooking timer with notifications
- 💾 Save recipes to your personal cookbook
- ⭐ Rate recipes (stored locally)
- 🌐 Real-time translation of recipe content
- 📸 Step-by-step photo guide
- 📱 Responsive design for all devices

### 🍱 My Cookbook
- 📚 View all saved recipes in one place
- 🔄 Sort by recency, name, or cuisine
- 🗑️ Remove recipes from your collection
- 📥 Export your recipes as PDF
- 🔍 Search within saved recipes

### ✍️ Upload Recipe
- 📝 Create and share your own recipes
- ➕ Add ingredients, steps, images, and prep time
- 🏷️ Add custom tags and categories
- 📱 Take photos directly from your device
- 🔄 Auto-save draft functionality

### 👩‍🍳 Community Recipes
- 👥 Browse recipes uploaded by other users
- ⭐ Rate and provide feedback on community recipes
- 💬 Leave comments and cooking tips
- 🔄 Share recipes on social media
- 🏆 Featured community chef highlights

### 🌐 Multilingual Support
- 🌍 Real-time translation using LibreTranslate API
- 🗣️ Supports 15+ languages including:
  - English, Hindi, Telugu, Tamil, Kannada, Malayalam
  - Bengali, Marathi, Gujarati, Punjabi, Urdu
  - French, Spanish, Chinese, and more
- 💾 Translation caching to reduce API calls
- 🌐 Auto-detect user's language preference

### 🗣️ Voice Search
- 🎤 Search recipes using your voice
- 🎙️ Voice-guided navigation
- 📱 Mobile-optimized voice interface
- 🔄 Voice command support for hands-free cooking

### 🌙 Dark/Light Theme
- 🌓 Toggle between light and dark modes
- 🌈 Custom accent color selection
- 💾 Theme preference saved in localStorage
- 🌟 Smooth transitions and animations

### 📱 Progressive Web App (PWA)
- 📲 Installable on desktop and mobile
- 📴 Offline caching of homepage and saved recipes
- 🔄 Background sync for updates
- 📱 App-like experience with splash screen

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/cookbook.git
   cd cookbook
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Visit `http://localhost:5173` in your browser

## 🛠️ Installation

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher) or yarn (v1.22 or higher)
- Modern web browser with JavaScript enabled

### Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/cookbook.git
   cd cookbook
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   The app will be available at `http://localhost:5173`

### Build for Production

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

The built files will be in the `dist` directory, ready for deployment.

## 🌐 Browser Support

CookBook works on all modern browsers including:

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile Safari (iOS 12+)
- Chrome for Android (latest 2 versions)

**Note:** Some features like PWA installation and voice search may have limited support in certain browsers.

## 🛠️ Technologies Used

- **React 18** - UI framework
- **React Router** - Routing
- **Framer Motion** - Animations
- **Vite** - Build tool
- **TheMealDB API** - Recipe data
- **LibreTranslate API** - Translation service
- **Web Speech API** - Voice recognition
- **localStorage** - Data persistence
- **PWA** - Progressive Web App features

## 📁 Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Navbar.jsx
│   ├── HeroSection.jsx
│   ├── RecipeCard.jsx
│   ├── RecipeList.jsx
│   ├── RecipeDetails.jsx
│   ├── SearchBar.jsx
│   ├── VoiceSearchButton.jsx
│   ├── UploadRecipeForm.jsx
│   ├── RatingStars.jsx
│   ├── IngredientChecklist.jsx
│   ├── Timer.jsx
│   ├── LanguageSwitcher.jsx
│   ├── ThemeToggle.jsx
│   ├── RecipeOfTheDay.jsx
│   └── Footer.jsx
├── pages/              # Page components
│   ├── Home.jsx
│   ├── MyCookbook.jsx
│   ├── UploadRecipe.jsx
│   ├── Community.jsx
│   └── About.jsx
├── utils/              # Utility functions
│   ├── api.js          # TheMealDB API calls
│   ├── translation.js  # Translation logic
│   ├── localStorage.js # Data persistence
│   └── theme.js        # Theme management
├── styles/             # Global styles
│   ├── global.css
│   └── theme.css
├── App.jsx             # Main app component
└── main.jsx            # Entry point
```

## 🎨 Design Features

- **Color Palette**: Food-inspired with warm oranges, greens, and browns
- **Typography**: Poppins and Nunito fonts for modern readability
- **Animations**: Smooth transitions and hover effects using Framer Motion
- **Responsive**: Works seamlessly on desktop, tablet, and mobile
- **Accessibility**: Semantic HTML and ARIA labels

## 🔌 API Usage

### TheMealDB API
- Free, no API key required
- Endpoints used:
  - `/search.php?s=` - Search by name
  - `/filter.php?i=` - Filter by ingredient
  - `/filter.php?a=` - Filter by cuisine
  - `/lookup.php?i=` - Get recipe by ID
  - `/random.php` - Get random recipe

### LibreTranslate API
- Free translation service
- Fallback to MyMemory Translation API if needed
- Translation results cached locally

## 🔧 Troubleshooting

### Common Issues

#### 🚫 Voice Search Not Working
- Ensure your browser supports the Web Speech API
- Check that you've allowed microphone permissions
- Try refreshing the page and granting permission again

#### 🌐 Translation Issues
- Check your internet connection
- The translation API might be rate limited, try again later
- Some languages might have limited translation support

#### 💾 Data Not Saving
- Ensure cookies and local storage are enabled in your browser
- Try clearing your browser cache and reloading the page
- Check if you're in private/incognito mode (some features may be limited)

### Getting Help

If you encounter any issues, please:
1. Check the [GitHub Issues](https://github.com/yourusername/cookbook/issues) for known problems
2. Search the [Discussions](https://github.com/yourusername/cookbook/discussions) for solutions
3. Open a new issue if your problem isn't already reported

## 🛣️ Roadmap

### Upcoming Features
- [ ] User authentication and cloud sync
- [ ] Meal planning and grocery list generation
- [ ] Nutrition information and calorie counter
- [ ] Video recipe support
- [ ] Smart shopping list that groups items by category
- [ ] Seasonal and holiday recipe collections
- [ ] Integration with smart home devices

### In Progress
- [x] Dark mode
- [x] PWA support
- [ ] Enhanced recipe search filters

### Completed
- [x] Basic recipe search and display
- [x] Local storage for saved recipes
- [x] Multilingual support

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

1. **Report Bugs**
   - Check existing issues before creating a new one
   - Provide detailed reproduction steps
   - Include browser/device information

2. **Suggest Enhancements**
   - Open an issue to discuss your ideas
   - Check the roadmap for planned features

3. **Code Contributions**
   - Fork the repository
   - Create a feature branch (`git checkout -b feature/amazing-feature`)
   - Commit your changes (`git commit -m 'Add some amazing feature'`)
   - Push to the branch (`git push origin feature/amazing-feature`)
   - Open a Pull Request

### Code Style
- Follow the existing code style
- Write meaningful commit messages
- Update documentation as needed
- Add tests for new features

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

Special thanks to these amazing projects and resources:

- [TheMealDB](https://www.themealdb.com/) - For their extensive recipe database
- [LibreTranslate](https://libretranslate.com/) - For providing free translation services
- [Font Awesome](https://fontawesome.com/) - For the beautiful icons
- [Google Fonts](https://fonts.google.com/) - For the typography
- [Vite](https://vitejs.dev/) - For the amazing development experience
- [React](https://reactjs.org/) - For making web development fun

---

Made with ❤️ for food lovers around the world

[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/open-source.svg)](https://forthebadge.com)


