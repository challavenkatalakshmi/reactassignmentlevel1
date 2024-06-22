import { useState, useEffect } from 'react';

const useForm = (validate) => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    age: '',
    attendingWithGuest: '',
    guestName: '',
    submitted: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      setValues({
        name: '',
        email: '',
        age: '',
        attendingWithGuest: '',
        guestName: '',
        submitted: true,
      });
    }
  }, [errors, isSubmitting]);

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
