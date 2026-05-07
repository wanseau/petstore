import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Chip, Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const PetCard = ({ pet }) => {
    return (
        <Card className="flex flex-col h-full rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden bg-white group cursor-pointer">
            <Box className="relative overflow-hidden">
                <CardMedia
                    component="img"
                    height="240"
                    image={pet.imageUrl || 'https://via.placeholder.com/400x300?text=No+Image'}
                    alt={pet.name}
                    className="h-56 w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <Box className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                    <Typography variant="subtitle2" className="font-bold text-gray-800">
                        ${pet.price?.toFixed(2)}
                    </Typography>
                </Box>
            </Box>
            
            <CardContent className="flex-grow flex flex-col p-6">
                <Box className="flex justify-between items-start mb-1">
                    <Typography variant="h5" component="div" className="font-extrabold text-gray-900 tracking-tight">
                        {pet.name}
                    </Typography>
                </Box>
                
                <Typography variant="body2" className="mb-4 text-gray-500 line-clamp-2 mt-2 leading-relaxed">
                    {pet.description || 'A lovely companion looking for a forever home.'}
                </Typography>
                
                <Box className="flex flex-wrap gap-2 mb-5">
                    <Chip 
                        label={pet.category} 
                        size="small" 
                        sx={{ bgcolor: '#ec4899', color: 'white', fontWeight: 600, fontSize: '0.7rem' }} 
                    />
                    <Chip 
                        label={pet.breed} 
                        size="small" 
                        variant="outlined" 
                        sx={{ borderColor: '#3b82f6', color: '#3b82f6', fontWeight: 600, fontSize: '0.7rem' }} 
                    />
                </Box>

                <Button 
                    variant="contained" 
                    fullWidth 
                    startIcon={<ShoppingCartIcon />}
                    disableElevation
                    sx={{
                        mt: 'auto',
                        textTransform: 'none',
                        fontWeight: 600,
                        borderRadius: '0.75rem',
                        py: 1,
                        bgcolor: '#3b82f6',
                        '&:hover': {
                            bgcolor: '#2563eb'
                        }
                    }}
                >
                    Adopt Me
                </Button>
            </CardContent>
        </Card>
    );
};

export default PetCard;
