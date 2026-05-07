import React from 'react';
import { TextField, MenuItem, Box, InputAdornment, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';

const FilterBar = ({ categories, selectedCategory, onCategoryChange, searchQuery, onSearchChange }) => {
    return (
        <Box className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-10 w-full max-w-4xl mx-auto -mt-16 relative z-20">
            <Typography variant="subtitle2" className="text-gray-500 font-semibold mb-4 uppercase tracking-wider text-xs flex items-center gap-2">
                <TuneIcon fontSize="small" /> Filter & Search
            </Typography>
            <Box className="flex flex-col sm:flex-row gap-5 items-center justify-between">
                <TextField
                    variant="outlined"
                    placeholder="Search by name or breed..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full sm:w-2/3"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon className="text-gray-400" />
                            </InputAdornment>
                        ),
                        sx: { borderRadius: '0.75rem', bgcolor: '#f8fafc' }
                    }}
                />
                
                <TextField
                    select
                    value={selectedCategory}
                    onChange={(e) => onCategoryChange(e.target.value)}
                    variant="outlined"
                    className="w-full sm:w-1/3"
                    InputProps={{ 
                        sx: { borderRadius: '0.75rem', bgcolor: '#f8fafc' } 
                    }}
                >
                    <MenuItem value="All" className="font-medium">All Categories</MenuItem>
                    {categories.map((category) => (
                        <MenuItem key={category} value={category} className="font-medium">
                            {category}
                        </MenuItem>
                    ))}
                </TextField>
            </Box>
        </Box>
    );
};

export default FilterBar;
