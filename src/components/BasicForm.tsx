import React from "react";
import useInput from "../hooks/useInput";

const validateName = (name: string) => {
  return name.trim().length > 0;
};

const validateEmail = (email: string) => {
  return new RegExp(/^\S+@\S+\.\S+$/).test(email);
};

const BasicForm = () => {
  const {
    value: firstName,
    valueIsValid: firstNameIsValid,
    inputHasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    valueBlurHandler: firstNameBlurHandler,
    reset: resetFirstName,
  } = useInput(validateName);

  const {
    value: lastName,
    valueIsValid: lastNameIsValid,
    inputHasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    valueBlurHandler: lastNameBlurHandler,
    reset: resetLastName,
  } = useInput(validateName);

  const {
    value: email,
    valueIsValid: emailIsValid,
    inputHasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(validateEmail);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    resetFirstName();
    resetLastName();
    resetEmail();
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="control-group">
        <div className={`form-control${firstNameHasError ? " invalid" : ""}`}>
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
          />
          {firstNameHasError && (
            <p className="error-text">First name can't be empty</p>
          )}
        </div>
        <div className={`form-control${lastNameHasError ? " invalid" : ""}`}>
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            type="text"
            value={lastName}
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
          />
          {lastNameHasError && (
            <p className="error-text">Last name can't be empty</p>
          )}
        </div>
      </div>
      <div className={`form-control${emailHasError ? " invalid" : ""}`}>
        <label htmlFor="email">E-Mail Address</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
      </div>
      {emailHasError && <p className="error-text">Email must be valid</p>}
      <div className="form-actions">
        <button
          type="submit"
          disabled={!(firstNameIsValid && lastNameIsValid && emailIsValid)}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default BasicForm;
