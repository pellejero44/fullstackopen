import React, { useState } from "react";
import Persons from "../src/components/Persons";
import PersonForm from "../src/components/PersonForm";
import Filter from "../src/components/Filter";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");
  const [showAll, setShowAll] = useState(true);

  const contactsToShow = showAll
    ? persons
    : persons.filter((person) => {
        let toFilter = person.name.toLocaleLowerCase();
        let toSearch = searchName.toLowerCase();
        return toFilter.includes(toSearch);
      });

  const personFormHandler = (event) => {
    event.preventDefault();
    const personToUpdate = persons.find((p) => {
      return p.name.includes(newName);
    });
    if (personToUpdate) {
      updatePerson(personToUpdate);
    } else {
      addPerson();
    }
  };

  const addPerson = () => {
    setPersons([...persons, { name: newName, number: newNumber }]);
    resetForm();
  };

  const updatePerson = (personToUpdate) => {
    const confirm = window.confirm(
      `${newName} is already added to phonebook, replace the old number with a new one?`
    );
    if (confirm) {
      let updatedState = persons.filter((p) => p.name !== personToUpdate.name);
      setPersons([...updatedState, { name: newName, number: newNumber }]);
      resetForm();
    }
  };

  const resetForm = () => {
    setNewName("");
    setNewNumber("");
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

  return (
    <div>
      <h2>Phonebook</h2>
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
      <Persons persons={contactsToShow} />
    </div>
  );
};

export default App;
