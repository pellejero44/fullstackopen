import React, { useState, useEffect } from 'react';
import countryService from '../services/countryService';
import CountryList from './CountryList';
import CountryFilter from './CountryFilter';

const Country = () => {
  const [newSearch, setNewSearch] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    countryService.getAll().then((response) => setCountries(response));
  }, []);

  const onChangeHandler = (event) => {
    setNewSearch(event.target.value);
  };

  return (
    <div>
      <h1>find countries</h1>
      <CountryFilter newSearch={newSearch} handleSearchChange={onChangeHandler} />
      <CountryList list={countries} search={newSearch} />
    </div>
  );
};

export default Country;
