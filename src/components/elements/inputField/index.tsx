import {
  FilledInputProps,
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
  showBorder = true,
  style,
  ...props
}: TextFieldProps & {
  errorMessage?: string;
  showSearchIcon?: boolean;
  showBorder?: boolean;
}) => {
  return (
    <>
      {label && (
        <InputLabel
          htmlFor={name}
          sx={props.error ? { ...styles.label, ...styles.color } : styles.label}
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
        InputProps={
          {
            ...props.InputProps,
            sx: { ...style, ...styles.input },
            inputProps: {
              'data-testid': id
            },
            disableUnderline: !showBorder,
            startAdornment: showSearchIcon ? (
              <InputAdornment position="start">
                <img alt="" src="/images/search-normal.png" />
              </InputAdornment>
            ) : null
          } as Partial<FilledInputProps> & { disableUnderline: boolean }
        }
      />
      <FormHelperText sx={styles.error_message}>{errorMessage}</FormHelperText>
    </>
  );
};

export default InputField;
