import React from "react";
import useInput from "../hooks/useInput";

const SimpleInput = () => {
  const {
    value: name,
    valueIsValid: nameIsValid,
    inputHasError: nameWasInvalidated,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput((name: string) => name.trim().length > 0);

  const {
    value: email,
    valueIsValid: emailIsValid,
    inputHasError: emailWasInvalidated,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput((email: string) => new RegExp(/^\S+@\S+\.\S+$/).test(email));

  const emailIsEmpty: boolean = email.trim().length === 0;

  const formIsValid = nameIsValid && emailIsValid;

  const formSubmissionHandler = (event: React.FormEvent) => {
    event.preventDefault();
    resetName();
    resetEmail();
  };

  const nameErrorClasses = `form-control${
    nameWasInvalidated ? " invalid" : ""
  }`;

  const emailErrorClasses = `form-control${
    emailWasInvalidated ? " invalid" : ""
  }`;

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameErrorClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
        />
        {nameWasInvalidated && (
          <p className="error-text">Name must not be empty</p>
        )}
      </div>
      <div className={emailErrorClasses}>
        <label htmlFor="email">Your Email</label>
        <input
          type="email"
          id="email"
          required
          value={email}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
        {emailWasInvalidated &&
          (emailIsEmpty ? (
            <p className="error-text">Email must not be empty</p>
          ) : (
            <p className="error-text">Email must be valid</p>
          ))}
      </div>
      <div className="form-actions">
        <button type="submit" disabled={!formIsValid}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default SimpleInput;
