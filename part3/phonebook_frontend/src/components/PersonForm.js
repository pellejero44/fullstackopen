import React from "react";

const PersonForm = ({
  onSubmitHandler,
  newName,
  onChangeNameHandler,
  newNumber,
  onChangeNumberHandler,
}) => {
  return (
    <form onSubmit={onSubmitHandler}>
      <div>
        name:
        <input type="text" value={newName} onChange={onChangeNameHandler} />
      </div>
      <div>
        number:
        <input type="number" value={newNumber} onChange={onChangeNumberHandler} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
