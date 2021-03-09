import React from 'react';

const CountryFilter = ({ newSearch, handleSearchChange }) => {
  return <input value={newSearch} onChange={handleSearchChange} />;
};

export default CountryFilter;
