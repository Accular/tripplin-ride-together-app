
import React from 'react';
import RideCreationForm from '../components/ride/RideCreationForm';

const CreateRide = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Plan Your Ride</h1>
      <div className="bg-white rounded-lg shadow-md overflow-visible">
        <RideCreationForm />
      </div>
    </div>
  );
};

export default CreateRide;
