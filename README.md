# GymLink Mini Comparison Full-Stack Application

A modern, full-stack web application for comparing fitness businesses across Sydney. Built with React, Node.js, and Express, featuring intelligent search, advanced filtering, and a beautiful responsive design.

![GymLink Preview](https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=800)

## 🚀 Features

### Core Features
- **Business Listings**: Display 8+ fitness businesses in elegant card layouts
- **Advanced Filtering**: Filter by category, price range, services, and vibe
- **Intelligent Search**: Natural language search supporting queries like "cheap yoga in Sydney"
- **Responsive Design**: Mobile-first design that works on all devices
- **Real-time Updates**: Instant filtering and search results

### Bonus Features
- **Smart Autocomplete**: Search suggestions based on business data
- **Natural Language Processing**: Understands context like "affordable gyms with sauna"
- **Interactive UI**: Smooth animations, hover effects, and micro-interactions
- **Professional Design**: Apple-level aesthetics with modern gradients and typography

## 🛠 Tech Stack

### Frontend
- **React 18** with functional components and hooks
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Context API** for state management
- **Lucide React** for icons
- **Vite** for fast development and building

### Backend
- **Node.js** with Express.js
- **ES6+ Modules** with modern JavaScript
- **CORS** enabled for cross-origin requests
- **JSON file** as data source (no database required)
- **RESTful API** design

## 📁 Project Structure

```
gymlink-app/
├── backend/                    # Backend API server
│   ├── data/
│   │   └── businesses.json     # Sample fitness business data
│   ├── routes/
│   │   └── businesses.js       # Business API routes
│   ├── server.js              # Express server setup
│   └── package.json           # Backend dependencies
├── src/                       # Frontend React application
│   ├── components/            # Reusable UI components
│   │   ├── BusinessCard.tsx   # Individual business card
│   │   ├── BusinessList.tsx   # List of businesses
│   │   ├── FilterPanel.tsx    # Filtering sidebar
│   │   └── SearchBar.tsx      # Search input with autocomplete
│   ├── context/
│   │   └── BusinessContext.tsx # Global state management
│   ├── services/
│   │   └── api.ts             # API service layer
│   ├── types/
│   │   └── index.ts           # TypeScript type definitions
│   ├── utils/
│   │   └── search.ts          # Search utility functions
│   ├── App.tsx                # Main application component
│   └── main.tsx               # Application entry point
├── package.json               # Frontend dependencies
└── README.md                  # This file
```

## 🚦 Getting Started

### Prerequisites

Make sure you have the following installed on your system:
- **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- A modern web browser (Chrome, Firefox, Safari, Edge)

### Installation & Setup

#### 1. Clone or Download the Project
If you have the project files, navigate to the project directory:
```bash
cd gymlink-app
```

#### 2. Install Frontend Dependencies
```bash
# Install frontend dependencies
npm install
```

#### 3. Install Backend Dependencies
```bash
# Navigate to backend directory
cd backend

# Install backend dependencies
npm install

# Return to root directory
cd ..
```

#### 4. Start the Backend Server
Open a new terminal window/tab and run:
```bash
# Navigate to backend directory
cd backend

# Start the backend server
npm run dev
```

The backend server will start on `http://localhost:3001`

You should see:
```
🚀 GymLink API server running on http://localhost:3001
📊 Health check available at http://localhost:3001/health
📋 Businesses API available at http://localhost:3001/api/businesses
```

#### 5. Start the Frontend Development Server
In another terminal window/tab (keep the backend running), run:
```bash
# Make sure you're in the root directory
npm run dev
```

The frontend will start on `http://localhost:5173`

You should see:
```
  VITE v5.4.2  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

#### 6. Open the Application
Open your web browser and navigate to:
```
http://localhost:5173
```

## 🧪 Testing

The application includes comprehensive tests using Vitest and React Testing Library.

### Running Tests
```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test -- --watch

# Run tests with coverage
npm run test -- --coverage

# Run tests with UI (if vitest UI is installed)
npm run test:ui
```

### Test Coverage
The test suite covers:
- **SearchBar Component**: Input handling, suggestions, keyboard navigation
- **FilterPanel Component**: Filter interactions, accessibility features
- **API Integration**: Mocked API responses and error handling
- **User Interactions**: Typing, clicking, form submissions

### Writing New Tests
Tests are located in `src/components/__tests__/` directory. Follow these patterns:

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import YourComponent from '../YourComponent';

describe('YourComponent', () => {
  it('should render correctly', () => {
    render(<YourComponent />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

## 🔧 Environment Variables

The application supports environment variables for configuration:

### Frontend (.env)
```bash
# Copy the example file
cp .env.example .env

# Edit with your values
VITE_API_BASE_URL=http://localhost:3001/api
VITE_APP_TITLE=GymLink Mini Comparison
```

### Backend (backend/.env)
```bash
# Copy the example file
cd backend
cp .env.example .env

# Edit with your values
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

## 🎯 Usage Guide

### Basic Usage
1. **Browse Businesses**: View all fitness businesses on the main page
2. **Switch Views**: Toggle between card and table views using the view toggle
2. **Search**: Use the search bar to find specific businesses, categories, or locations
3. **Filter**: Use the sidebar filters to narrow down results by:
   - Category (Gym, Yoga, Pilates, Boxing)
   - Price range ($0-$100 per week)
   - Services (Sauna, PT, Group Classes, etc.)
   - Vibe (Performance & Intensity, Calm & Wellness, etc.)
4. **Compare**: Use table view for side-by-side comparison of businesses

### Advanced Search Examples
Try these natural language searches:
- `"yoga in Bondi"`
- `"cheap gyms"`
- `"boxing with PT"`
- `"sauna and group classes"`
- `"affordable fitness in Sydney"`

### API Endpoints
The backend provides these REST API endpoints:

- `GET /health` - Health check
- `GET /api/businesses` - Get all businesses
- `GET /api/businesses?category=Gym` - Filter by category
- `GET /api/businesses?search=yoga` - Search businesses
- `GET /api/businesses/:id` - Get specific business
- `GET /api/businesses/meta/categories` - Get all categories
- `GET /api/businesses/meta/services` - Get all services

## 🔧 Development

### Available Scripts

#### Frontend Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run test         # Run tests
npm run test:ui      # Run tests with UI
```

#### Backend Scripts
```bash
cd backend
npm start            # Start production server
npm run dev          # Start development server with auto-reload
```

### Environment Variables
No environment variables are required for basic setup. The application uses default ports:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3001`

### Adding New Businesses
To add new businesses, edit `backend/data/businesses.json`:

```json
{
  "id": 9,
  "name": "Your Gym Name",
  "category": "Gym",
  "location": "Your Location",
  "price": 45,
  "services": ["Service1", "Service2"],
  "vibe": "Performance & Intensity",
  "description": "Your description",
  "rating": 4.5,
  "image": "https://your-image-url.jpg"
}
```

## 🎨 Design Decisions

### Architecture Choices
- **Context API over Redux**: Simpler state management for this scale
- **TypeScript**: Enhanced developer experience and type safety
- **Modular Components**: Reusable, maintainable component structure
- **Service Layer**: Clean separation between API calls and components

### UI/UX Decisions
- **Card Layout**: Better visual hierarchy than tables
- **Gradient Design**: Modern, professional appearance
- **Sticky Filters**: Always accessible filtering options
- **Responsive Grid**: Optimal viewing on all devices
- **Micro-interactions**: Enhanced user engagement

### Performance Optimizations
- **Debounced Search**: Prevents excessive API calls
- **Lazy Loading**: Components load as needed
- **Optimized Images**: Compressed images from Pexels
- **Efficient Filtering**: Client-side filtering for better UX

## ♿ Accessibility (a11y) Considerations

This application has been built with accessibility in mind to ensure it's usable by everyone:

### Semantic HTML
- **Proper heading hierarchy**: H1 → H2 → H3 structure for screen readers
- **Semantic elements**: `<main>`, `<section>`, `<aside>`, `<header>`, `<footer>`
- **Form labels**: All form inputs have associated labels
- **Table structure**: Proper `<table>`, `<thead>`, `<tbody>`, `<th>`, `<td>` elements

### ARIA Labels and Roles
- **Search input**: Descriptive placeholder and aria-label
- **Filter controls**: Proper labeling for screen readers
- **Table view**: `role="table"`, `role="row"`, proper column headers
- **View toggle**: `role="tablist"`, `aria-selected` states
- **Loading states**: Announced to screen readers

### Keyboard Navigation
- **Tab order**: Logical tab sequence through all interactive elements
- **Enter key**: Activates search functionality
- **Escape key**: Closes suggestion dropdowns
- **Focus indicators**: Visible focus rings on all interactive elements
- **Skip links**: Can be added for main content navigation

### Color and Contrast
- **WCAG AA compliance**: All text meets minimum contrast ratios
- **Color independence**: Information not conveyed by color alone
- **Focus indicators**: High contrast focus rings
- **Status indicators**: Use icons + text, not just color

### Screen Reader Support
- **Alt text**: Descriptive alt text for all images
- **Loading states**: Announced when content is loading
- **Error messages**: Properly associated with form fields
- **Dynamic content**: Updates announced to screen readers

### Mobile Accessibility
- **Touch targets**: Minimum 44px touch target size
- **Responsive text**: Scales appropriately with zoom
- **Orientation support**: Works in both portrait and landscape
- **Reduced motion**: Respects user's motion preferences

### Testing Accessibility
```bash
# Install accessibility testing tools
npm install --save-dev @axe-core/react

# Run accessibility audits
npm run test -- --coverage
```

### Future Accessibility Improvements
- Add skip navigation links
- Implement high contrast mode
- Add keyboard shortcuts for common actions
- Include screen reader specific instructions
- Add voice navigation support

## 🐛 Troubleshooting

### Common Issues

#### Port Already in Use
If you get a port error:
```bash
# Kill processes on ports
npx kill-port 3001  # Backend
npx kill-port 5173  # Frontend
```

#### Backend Not Connecting
1. Ensure backend server is running on port 3001
2. Check console for error messages
3. Verify `http://localhost:3001/health` returns OK

#### Search Not Working
1. Clear browser cache
2. Check browser console for errors
3. Ensure both servers are running

#### Styling Issues
1. Ensure Tailwind CSS is properly installed
2. Check if PostCSS is configured correctly
3. Restart the development server

### Getting Help
If you encounter issues:
1. Check the browser console for errors
2. Verify both servers are running
3. Ensure all dependencies are installed
4. Check that ports 3001 and 5173 are available

## 📝 API Documentation

### Business Object Structure
```typescript
interface Business {
  id: number;
  name: string;
  category: string;
  location: string;
  price: number;
  services: string[];
  vibe: string;
  description: string;
  rating: number;
  image: string;
}
```

### Filter Parameters
- `category`: Filter by business category
- `minPrice`: Minimum weekly price
- `maxPrice`: Maximum weekly price
- `services`: Comma-separated list of services
- `vibe`: Filter by business vibe
- `search`: Search term for name, category, location

## 🚀 Deployment

### Frontend Deployment
```bash
npm run build
# Deploy the 'dist' folder to your hosting service
```

### Backend Deployment
The backend can be deployed to services like:
- Heroku
- Railway
- Render
- DigitalOcean App Platform

Update CORS origins in `server.js` for production domains.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Pexels** for high-quality fitness images
- **Lucide** for beautiful icons
- **Tailwind CSS** for utility-first styling
- **React Team** for the amazing framework

---

**Happy coding! 🏋️‍♂️💪**

For questions or support, please check the troubleshooting section or create an issue in the repository.