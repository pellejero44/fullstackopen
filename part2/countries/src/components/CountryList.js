import CountryDetail from './CountryDetail';

const CountryList = ({ list, search, show}) => {
  const data = list.filter((country) =>
    country.name.toLowerCase().includes(search.toLowerCase())
  );

  if (data.length === 1) {
    return <CountryDetail country={data[0]} />;
  } else if (data.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else {
    return (
      <div>
        {data.map((country) => (
          <div key={country.name}> 
            <span> {country.name} </span>
            <button value={country.name} onClick={show}> Show </button>
            <br/>
          </div>
        ))}
      </div>
    );
  }
};

export default CountryList;
