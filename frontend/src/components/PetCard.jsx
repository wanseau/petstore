import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Chip } from '@mui/material';

const PetCard = ({ pet }) => {
    return (
        <Card className="flex flex-col h-full rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden bg-white">
            <CardMedia
                component="img"
                height="200"
                image={pet.imageUrl || 'https://via.placeholder.com/300x200?text=No+Image'}
                alt={pet.name}
                className="h-48 object-cover"
            />
            <CardContent className="flex-grow flex flex-col p-5">
                <Box className="flex justify-between items-start mb-2">
                    <Typography variant="h5" component="div" className="font-bold text-gray-800">
                        {pet.name}
                    </Typography>
                    <Typography variant="h6" color="primary" className="font-semibold text-blue-600">
                        ${pet.price?.toFixed(2)}
                    </Typography>
                </Box>
                
                <Typography variant="body2" color="text.secondary" className="mb-3 text-gray-600 line-clamp-2">
                    {pet.description || 'A lovely pet looking for a home.'}
                </Typography>
                
                <Box className="mt-auto flex flex-wrap gap-2 pt-3">
                    <Chip label={pet.category} size="small" color="secondary" variant="outlined" className="text-xs font-medium" />
                    <Chip label={pet.breed} size="small" color="info" variant="outlined" className="text-xs font-medium" />
                </Box>
            </CardContent>
        </Card>
    );
};

export default PetCard;
