# MealPlanr - Smart Meal Planning for Budget-Conscious Families

MealPlanr is an AI-driven web application that helps families reduce grocery costs by 20-30% through personalized meal plans, smart shopping lists, and community-powered savings tips.

## 🚀 Features

- **AI-Driven Meal Planning**: Personalized weekly meal plans based on dietary needs and budget
- **Cost Optimization**: Smart price comparisons and local deal integration
- **Smart Shopping Lists**: Organized by store and optimized for best prices
- **Leftover Management**: Minimize food waste with creative suggestions
- **Community Support**: Share recipes, tips, and savings stories
- **Premium Features**: Enhanced meal plans and exclusive savings for premium users

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Routing**: React Router v6
- **Build Tool**: Vite
- **Deployment**: Vercel
- **State Management**: React hooks + localStorage
- **Icons**: Lucide React

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mealplanr
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5137](http://localhost:5137) in your browser

## 📦 Build & Deploy

### Local Build
```bash
npm run build
npm run preview
```

### Deploy to Vercel

#### Option 1: Vercel CLI
```bash
npm install -g vercel
npm run deploy
```

#### Option 2: GitHub Integration
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically deploy on every push to main

#### Option 3: Manual Deploy
1. Run `npm run build`
2. Upload the `dist` folder to Vercel

## 🔐 Demo Accounts

### Trial User (Google Sign-in)
- Any Google account will create a trial user
- 7-day free trial with basic features

### Premium User (Email Sign-in)
- **Email**: osama@ehsaan.com
- **Password**: 123
- Full premium features unlocked

### Regular Trial User (Email Sign-in)
- Any other email/password combination
- Can upgrade to premium from profile page

## 🎯 User Flows

### New User Journey
1. **Landing Page** → Learn about features
2. **Onboarding** → Set up profile and preferences
3. **Dashboard** → View personalized meal plans
4. **Shopping List** → Get optimized grocery lists
5. **Community** → Connect with other families

### Returning User Journey
1. **Sign In** → Access existing account
2. **Dashboard** → View current meal plan and stats
3. **Profile** → Update preferences or upgrade to premium
4. **Leftovers** → Manage food waste
5. **Community** → Share tips and recipes

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   └── SignInModal.tsx # Authentication modal
├── pages/              # Route components
│   ├── Index.tsx       # Landing page
│   ├── Dashboard.tsx   # Main app dashboard
│   ├── Profile.tsx     # User profile settings
│   ├── Onboarding.tsx  # New user setup
│   ├── ShoppingList.tsx# Smart shopping lists
│   ├── Leftovers.tsx   # Leftover management
│   ├── Community.tsx   # Community features
│   └── Demo.tsx        # Feature demonstration
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── utils/              # Helper functions
└── globals.css         # Global styles
```

## 🔧 Configuration Files

- `vercel.json` - Vercel deployment configuration
- `vite.config.ts` - Vite build configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration

## 🌟 Key Features Implementation

### Authentication System
- Mock authentication with localStorage
- Google and email sign-in options
- Premium user detection
- Session management

### Meal Planning
- AI-generated meal suggestions
- Budget optimization
- Dietary restriction handling
- Premium vs. trial feature differentiation

### Shopping Lists
- Store-based organization
- Price optimization
- Sale item detection
- Progress tracking

### Community Features
- Public posting system
- Private messaging
- Recipe sharing
- Savings story sharing

## 🚀 Deployment Checklist

- ✅ Optimized build configuration
- ✅ Proper routing for SPA
- ✅ Meta tags for SEO
- ✅ Performance optimizations
- ✅ Error boundaries
- ✅ Responsive design
- ✅ Cross-browser compatibility

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email support@mealplanr.com or join our community forum.

---

**Live Demo**: [https://mealplanr.vercel.app](https://mealplanr.vercel.app)

Built with ❤️ for budget-conscious families everywhere.# meal-planner-2
