import React, { useState, useEffect } from 'react';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import personService from './services/personService';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchName, setSearchName] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [responseMessage, setResponseMessage] = useState({
    status_code: 0,
    message: '',
  });

  useEffect(() => {
    personService.getAll().then((initPersons) => {
      setPersons(initPersons);
    });
  }, []);

  const contactsToShow = showAll
    ? persons
    : persons.filter((person) => {
        let toFilter = person.name.toLocaleLowerCase();
        let toSearch = searchName.toLowerCase();
        return toFilter.includes(toSearch);
      });

  const personFormHandler = (event) => {
    event.preventDefault();
    const personToUpdate = persons.find(p => p.name === newName);
    if (personToUpdate) {
      updatePerson(personToUpdate);
    } else {
      addPerson();
    }
  };

  const addPerson = () => {
    const personToAdd = getPersonToAdd();
    personService.create(personToAdd).then((personAdded) => {
      if (persons.some((p) => p.name === personAdded.name)) {
        alert(`${newName} is already added to phonebook`);
      } else {
        setPersons([...persons, personAdded]);
        setNotification(200, 'Person was added');
        resetForm();
      }
    });
  };

  const getPersonToAdd = () => {
    const personObject = {
      name: newName,
      number: newNumber,
      id: Math.max(persons.map((p) => p.id)) + 1,
    };
    return personObject;
  };

  const updatePerson = (personToUpdate) => {
    const confirm = window.confirm(
      `${newName} is already added to phonebook, replace the old number with a new one?`
    );
    if (confirm) {
      personService
        .update(personToUpdate.id, {
          ...personToUpdate,
          number: newNumber,
        })
        .then((updatedPerson) => {
          let updatedState = persons.filter((p) => p.id !== updatedPerson.id);
          setPersons([...updatedState, updatedPerson]);
          setNotification(200, 'Person was updated');
          resetForm();
        });
    }
  };

  const deletePerson = (id) => {
    personService.remove(id).then(() => {
      const updatedPersons = persons.filter((p) => p.id !== id);
      setPersons(updatedPersons);
      setNotification(200, 'Person was deleted');
    })
    .catch(() => {
      setNotification(400, 'User has already been removed from server');
    });
  };

  const resetForm = () => {
    setNewName('');
    setNewNumber('');
  };

  const handleContactChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchName = (event) => {
    setSearchName(event.target.value);
    setShowAll(false);
  };

  const setNotification = (status_code, message) => {
    setResponseMessage({ status_code, message });
    setTimeout(() => {
      setResponseMessage({
        status_code: 0,
        message: '',
      });
    }, 5000);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={responseMessage} />
      <Filter onChangeHandler={handleSearchName} />
      <h2>Add a new</h2>
      <PersonForm
        onSubmitHandler={personFormHandler}
        newName={newName}
        onChangeNameHandler={handleContactChange}
        newNumber={newNumber}
        onChangeNumberHandler={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={contactsToShow} onDelete={deletePerson} />
    </div>
  );
};

export default App;
