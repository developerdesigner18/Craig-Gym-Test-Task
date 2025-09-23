import express from 'express';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load businesses data
let businesses;
try {
  const businessesPath = join(__dirname, '../data/businesses.json');
  const businessesData = readFileSync(businessesPath, 'utf8');
  businesses = JSON.parse(businessesData);
} catch (error) {
  console.error('Error loading businesses data:', error);
  businesses = [];
}

// GET /api/businesses - Get all businesses with optional filters
router.get('/', (req, res) => {
  try {
    let filteredBusinesses = [...businesses];
    
    const { category, minPrice, maxPrice, search, services, vibe } = req.query;
    
    // Filter by category
    if (category && category !== 'all') {
      filteredBusinesses = filteredBusinesses.filter(
        business => business.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Filter by price range
    if (minPrice) {
      filteredBusinesses = filteredBusinesses.filter(
        business => business.price >= parseInt(minPrice)
      );
    }
    
    if (maxPrice) {
      filteredBusinesses = filteredBusinesses.filter(
        business => business.price <= parseInt(maxPrice)
      );
    }
    
    // Filter by services
    if (services) {
      const servicesList = services.split(',').map(s => s.trim());
      filteredBusinesses = filteredBusinesses.filter(business =>
        servicesList.some(service =>
          business.services.some(businessService =>
            businessService.toLowerCase().includes(service.toLowerCase())
          )
        )
      );
    }
    
    // Filter by vibe
    if (vibe && vibe !== 'all') {
      filteredBusinesses = filteredBusinesses.filter(
        business => business.vibe.toLowerCase().includes(vibe.toLowerCase())
      );
    }
    
    // Search functionality
    if (search) {
      const searchTerm = search.toLowerCase();
      filteredBusinesses = filteredBusinesses.filter(business =>
        business.name.toLowerCase().includes(searchTerm) ||
        business.category.toLowerCase().includes(searchTerm) ||
        business.location.toLowerCase().includes(searchTerm) ||
        business.description.toLowerCase().includes(searchTerm) ||
        business.services.some(service =>
          service.toLowerCase().includes(searchTerm)
        ) ||
        business.vibe.toLowerCase().includes(searchTerm)
      );
    }
    
    // Sort by rating (highest first) as default
    filteredBusinesses.sort((a, b) => b.rating - a.rating);
    
    res.json({
      success: true,
      data: filteredBusinesses,
      count: filteredBusinesses.length,
      total: businesses.length
    });
  } catch (error) {
    console.error('Error fetching businesses:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// GET /api/businesses/:id - Get single business
router.get('/:id', (req, res) => {
  try {
    const businessId = parseInt(req.params.id);
    const business = businesses.find(b => b.id === businessId);
    
    if (!business) {
      return res.status(404).json({
        success: false,
        message: 'Business not found'
      });
    }
    
    res.json({
      success: true,
      data: business
    });
  } catch (error) {
    console.error('Error fetching business:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// GET /api/businesses/categories - Get all unique categories
router.get('/meta/categories', (req, res) => {
  try {
    const categories = [...new Set(businesses.map(b => b.category))];
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// GET /api/businesses/services - Get all unique services
router.get('/meta/services', (req, res) => {
  try {
    const allServices = businesses.flatMap(b => b.services);
    const services = [...new Set(allServices)];
    res.json({
      success: true,
      data: services
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

export default router;