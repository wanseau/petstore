import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
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
      default: '#f3f4f6', // gray-100
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

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
      // In a real app with no backend data yet, we might use mock data
      // For now we'll try to fetch from backend
      const data = await getPets();
      setPets(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching pets:', err);
      // Setting mock data for demonstration if backend is down
      setPets([
        { id: 1, name: 'Bella', breed: 'Golden Retriever', category: 'Dog', price: 1200.00, description: 'Friendly and energetic family dog.', imageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=400', stockQuantity: 1 },
        { id: 2, name: 'Luna', breed: 'Siamese', category: 'Cat', price: 800.00, description: 'Vocal and affectionate indoor cat.', imageUrl: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&q=80&w=400', stockQuantity: 2 },
        { id: 3, name: 'Charlie', breed: 'Cockatiel', category: 'Bird', price: 150.00, description: 'Whistles tunes and loves interaction.', imageUrl: 'https://images.unsplash.com/photo-1522276498395-f4f68f7f8454?auto=format&fit=crop&q=80&w=400', stockQuantity: 5 },
        { id: 4, name: 'Max', breed: 'German Shepherd', category: 'Dog', price: 1500.00, description: 'Loyal protector and intelligent companion.', imageUrl: 'https://images.unsplash.com/photo-1589941013453-ec89f33b6e95?auto=format&fit=crop&q=80&w=400', stockQuantity: 1 },
      ]);
      setError('Unable to connect to backend API. Showing mock data.');
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
      <Box className="min-h-screen bg-gray-100 pb-12">
        <Box className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
          <Container maxWidth="xl" className="py-4 flex items-center gap-3">
            <PetsIcon className="text-blue-500 text-4xl" />
            <Typography variant="h4" component="h1" className="font-bold text-gray-800 tracking-tight">
              Paws & Claws <span className="text-blue-500">Boutique</span>
            </Typography>
          </Container>
        </Box>

        <Container maxWidth="xl" className="mt-8">
          {error && (
            <Box className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
              <Typography className="text-yellow-700">{error}</Typography>
            </Box>
          )}

          <FilterBar 
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          {loading ? (
            <Box className="flex justify-center items-center h-64">
              <CircularProgress />
            </Box>
          ) : (
            <PetGrid pets={filteredPets} />
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
