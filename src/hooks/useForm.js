import React from "react";

export const useForm = (inputValues) => {
  const [values, setValues] = React.useState(inputValues);

  const handleChange = (e) => {
    const {value, name} = e.target;
    setValues({...values, [name]: value});
  };
  return {values, handleChange, setValues};
}
