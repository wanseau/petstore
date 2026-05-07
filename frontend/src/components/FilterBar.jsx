import React from 'react';
import { TextField, MenuItem, Box, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const FilterBar = ({ categories, selectedCategory, onCategoryChange, searchQuery, onSearchChange }) => {
    return (
        <Box className="bg-white p-4 rounded-xl shadow-md mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <TextField
                variant="outlined"
                placeholder="Search pets..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full sm:w-1/2"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                    className: "rounded-lg"
                }}
                size="small"
            />
            
            <TextField
                select
                label="Category"
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                variant="outlined"
                className="w-full sm:w-1/4"
                size="small"
                InputProps={{ className: "rounded-lg" }}
            >
                <MenuItem value="All">All Categories</MenuItem>
                {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                        {category}
                    </MenuItem>
                ))}
            </TextField>
        </Box>
    );
};

export default FilterBar;
