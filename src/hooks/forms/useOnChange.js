import { useState } from 'react';
import useValidateForm from './useValidateForm';

export default useOnChange = (initialState) => {
  const [inputs, setInputs] = useState(initialState);
  const { errors, handleError, handleValidateForm } = useValidateForm(inputs);

  const handleChangeInput = (input, value) => {
    setInputs((prevState) => ({
      ...prevState,
      [input]: value
    }))
  }

  return { 
    inputs,
    errors,
    handleError,
    handleChangeInput,
    handleValidateForm
  }
};
