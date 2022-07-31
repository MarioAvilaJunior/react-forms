import React, { useState } from "react";

const SimpleInput = () => {
  const [name, setName] = useState<string>("");
  const [nameWasTouched, setNameWasTouched] = useState<boolean>(false);

  const nameIsValid = name.trim().length > 0;
  const nameWasInvalidated = !nameIsValid && nameWasTouched;

  const nameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const nameBlurHander = () => {
    setNameWasTouched(true);
  };

  const formSubmissionHandler = (event: React.FormEvent) => {
    event.preventDefault();
    setName("");
    setNameWasTouched(false);
  };

  const errorClass = `form-control${nameWasInvalidated ? " invalid" : ""}`;

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={errorClass}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={nameChangeHandler}
          onBlur={nameBlurHander}
        />
        {nameWasInvalidated && (
          <p className="error-text">Name must not be empty</p>
        )}
      </div>
      <div className="form-actions">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
