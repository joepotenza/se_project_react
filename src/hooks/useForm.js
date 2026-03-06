import { useState } from "react";

// useForm() accepts an object of default values as an argument,
// creates a state object, its setter, and a change handler, and
// returns them.
export function useForm(defaultValues) {
  const [values, setValues] = useState(defaultValues);

  const handleChange = (evt) => {
    const { value, name } = evt.target;
    setValues({ ...values, [name]: value });
  };

  return { values, handleChange, setValues };
}
