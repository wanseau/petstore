import React from 'react';
import PetCard from './PetCard';

const PetGrid = ({ pets }) => {
    if (!pets || pets.length === 0) {
        return (
            <div className="flex justify-center items-center h-64 w-full">
                <p className="text-xl text-gray-500 font-medium">No pets found matching your criteria.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
            {pets.map(pet => (
                <div key={pet.id} className="w-full">
                    <PetCard pet={pet} />
                </div>
            ))}
        </div>
    );
};

export default PetGrid;
