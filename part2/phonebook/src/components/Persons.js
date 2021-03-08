import React from 'react';

const Persons = ({ persons }) => {

  return(
    <div>
      {persons.map(pers => (
        <p key={pers.name}>
          {pers.name} {pers.number}
        </p>
      ))}
    </div>
  );
}
export default Persons;