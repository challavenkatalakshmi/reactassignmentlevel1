import React from 'react';
import useForm from './useForm';
import './EventRegistrationForm.css'; // Import the CSS file

const EventRegistrationForm = () => {
  const { values, errors, handleChange, handleSubmit } = useForm(validate);

  function validate(values) {
    let errors = {};

    if (!values.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email is invalid';
    }

    if (!values.age) {
      errors.age = 'Age is required';
    } else if (isNaN(values.age) || values.age <= 0) {
      errors.age = 'Age must be a number greater than 0';
    }

    if (values.attendingWithGuest === 'yes' && !values.guestName.trim()) {
      errors.guestName = 'Guest Name is required';
    }

    return errors;
  }

  return (
    <div className="form-container">
      <h2>Event Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={values.name || ''} onChange={handleChange} />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={values.email || ''} onChange={handleChange} />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label>Age:</label>
          <input type="number" name="age" value={values.age || ''} onChange={handleChange} />
          {errors.age && <p className="error">{errors.age}</p>}
        </div>

        <div className="form-group">
          <label>Are you attending with a guest?</label>
          <select name="attendingWithGuest" value={values.attendingWithGuest || ''} onChange={handleChange}>
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {values.attendingWithGuest === 'yes' && (
          <div className="form-group">
            <label>Guest Name:</label>
            <input type="text" name="guestName" value={values.guestName || ''} onChange={handleChange} />
            {errors.guestName && <p className="error">{errors.guestName}</p>}
          </div>
        )}

        <button type="submit">Submit</button>
      </form>

      {/* Display summary on submission */}
      {values.submitted && (
        <div className="summary">
          <h3>Summary:</h3>
          <p>Name: {values.name}</p>
          <p>Email: {values.email}</p>
          <p>Age: {values.age}</p>
          {values.attendingWithGuest === 'yes' && <p>Guest Name: {values.guestName}</p>}
        </div>
      )}
    </div>
  );
};

export default EventRegistrationForm;
