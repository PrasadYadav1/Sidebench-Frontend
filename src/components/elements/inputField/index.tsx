import {
  FormHelperText,
  InputLabel,
  TextField,
  TextFieldProps
} from '@mui/material';
import React from 'react';
import styles from './styles';

const InputField = ({
  id,
  label = '',
  name,
  type,
  placeholder,
  errorMessage = '',
  size = 'medium',
  ...props
}: TextFieldProps & { errorMessage?: string }) => {
  return (
    <>
      {label && (
        <InputLabel
          htmlFor={name}
          sx={
            props.error ? { ...styles.label, color: '#ED0000' } : styles.label
          }
        >
          {label}
        </InputLabel>
      )}
      <TextField
        id={id}
        name={name}
        placeholder={placeholder}
        type={type}
        size={size}
        fullWidth
        {...props}
        sx={styles.text_field}
        inputProps={{ sx: styles.input, 'data-testid': id }}
      />
      <FormHelperText sx={styles.error_message}>{errorMessage}</FormHelperText>
    </>
  );
};

export default InputField;
