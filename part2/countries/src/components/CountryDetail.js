const CountryDetail = ({ country }) => {
    return (
        <div>
          <h1>{country.name}</h1>
          <p>capital {country.capital}</p>
          <p>population {country.population}</p>
          <h3>languages</h3>
          <ul>
            {country.languages.map(language => (
              <li key={language.name}>{language.name}</li>
            ))}
          </ul>
          <img src={country.flag} height='150' alt={`${country.name} flag`} />
        </div>
      );
  };
  
  export default CountryDetail;