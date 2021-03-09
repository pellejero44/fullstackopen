import CountryDetail from './CountryDetail';

const CountryList = ({ list, search }) => {
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
          <p key={country.name}> {country.name} </p>
        ))}
      </div>
    );
  }
};

export default CountryList;
