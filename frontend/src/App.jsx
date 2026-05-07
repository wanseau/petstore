import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress, Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { getPets } from './api/petApi';
import PetGrid from './components/PetGrid';
import FilterBar from './components/FilterBar';
import PetsIcon from '@mui/icons-material/Pets';
import './index.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3b82f6', // blue-500
    },
    secondary: {
      main: '#ec4899', // pink-500
    },
    background: {
      default: '#f8fafc', // slate-50
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    button: {
      textTransform: 'none',
    }
  },
  shape: {
    borderRadius: 12,
  }
});

// The animals provided by the user in the attachments
const userProvidedPets = [
  { id: 1, name: 'Midnight', breed: 'Common Crow', category: 'Bird', price: 150.00, description: 'An incredibly intelligent and curious bird. Loves shiny objects and solving puzzles.', imageUrl: '/images/crow.jpg', stockQuantity: 2 },
  { id: 2, name: 'Sterling', breed: 'British Shorthair', category: 'Cat', price: 950.00, description: 'A calm, easygoing, and incredibly plush gray feline companion.', imageUrl: '/images/shorthair.jpg', stockQuantity: 1 },
  { id: 3, name: 'Winston', breed: 'English Bulldog', category: 'Dog', price: 1800.00, description: 'A sturdy, muscular, and incredibly affectionate dog with a signature wrinkled face.', imageUrl: '/images/bulldog.jpg', stockQuantity: 1 },
  { id: 4, name: 'Wrinkles', breed: 'Shar Pei', category: 'Dog', price: 1200.00, description: 'Known for their deep wrinkles and blue-black tongue. Very loyal and protective.', imageUrl: '/images/sharpei.jpg', stockQuantity: 1 },
];

function App() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      setLoading(true);
      const data = await getPets();
      // If the backend has no data, we fallback to the user provided pets
      if (data && data.length > 0) {
         setPets(data);
      } else {
         setPets(userProvidedPets);
      }
      setError(null);
    } catch (err) {
      console.error('Error fetching pets:', err);
      // Fallback to the user provided pets if backend is unreachable
      setPets(userProvidedPets);
      setError('Unable to connect to live backend. Showing the boutique collection.');
    } finally {
      setLoading(false);
    }
  };

  const categories = [...new Set(pets.map(pet => pet.category))];

  const filteredPets = pets.filter(pet => {
    const matchesSearch = pet.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          pet.breed.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || pet.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <ThemeProvider theme={theme}>
      <Box className="min-h-screen bg-slate-50 pb-20 font-sans">
        
        {/* Navbar */}
        <Box className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-50">
          <Container maxWidth="xl" className="py-4 flex justify-between items-center">
            <Box className="flex items-center gap-3">
              <Box className="bg-blue-500 p-2 rounded-xl">
                <PetsIcon className="text-white text-3xl" />
              </Box>
              <Typography variant="h5" component="h1" className="font-extrabold text-gray-900 tracking-tight">
                Paws&Claws <span className="text-blue-500 font-light">Boutique</span>
              </Typography>
            </Box>
            <Button variant="outlined" sx={{ borderRadius: '20px', px: 3, fontWeight: 600 }}>
              Sign In
            </Button>
          </Container>
        </Box>

        {/* Hero Section */}
        <Box className="bg-gradient-to-r from-blue-600 to-indigo-700 py-24 relative overflow-hidden">
          {/* Decorative circles */}
          <Box className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></Box>
          <Box className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full translate-x-1/3 translate-y-1/3"></Box>
          
          <Container maxWidth="lg" className="relative z-10 text-center">
            <Typography variant="h2" component="h1" className="text-white font-extrabold mb-4 drop-shadow-sm tracking-tight" sx={{ fontSize: { xs: '2.5rem', md: '4rem' }}}>
              Find Your New Best Friend
            </Typography>
            <Typography variant="h6" className="text-blue-100 font-medium max-w-2xl mx-auto leading-relaxed">
              Explore our premium collection of well-loved and unique animals looking for their forever home today.
            </Typography>
          </Container>
        </Box>

        <Container maxWidth="xl">
          <FilterBar 
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          {error && (
            <Box className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 max-w-4xl mx-auto flex items-center justify-center">
              <Typography className="text-amber-800 font-medium">{error}</Typography>
            </Box>
          )}

          {loading ? (
            <Box className="flex flex-col justify-center items-center h-64 gap-4">
              <CircularProgress size={48} thickness={4} />
              <Typography className="text-gray-500 font-medium">Preparing the boutique...</Typography>
            </Box>
          ) : (
            <Box className="mt-4">
              <PetGrid pets={filteredPets} />
            </Box>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
