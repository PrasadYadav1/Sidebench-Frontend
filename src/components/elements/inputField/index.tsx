import {
  FormHelperText,
  InputAdornment,
  InputLabel,
  TextField,
  TextFieldProps
} from '@mui/material';
import styles from './styles';

const InputField = ({
  id,
  label = '',
  name,
  type,
  placeholder,
  errorMessage = '',
  showSearchIcon = false,
  size = 'medium',
  style,
  ...props
}: TextFieldProps & { errorMessage?: string; showSearchIcon?: boolean }) => {
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
        {...props}
        id={id}
        name={name}
        placeholder={placeholder}
        type={type}
        size={size}
        fullWidth
        sx={styles.text_field}
        InputProps={{
          sx: { ...style, ...styles.input },
          inputProps: {
            'data-testid': id
          },
          startAdornment: showSearchIcon ? (
            <InputAdornment position="start">
              <img alt="" src="/images/search-normal.png" />
            </InputAdornment>
          ) : null
        }}
      />
      <FormHelperText sx={styles.error_message}>{errorMessage}</FormHelperText>
    </>
  );
};

export default InputField;
