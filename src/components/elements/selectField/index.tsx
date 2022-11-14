import {
  FormControl,
  FormHelperText,
  MenuItem,
  OutlinedInput,
  Select
} from '@mui/material';
import styles from './styles';
import CustomSelectProps, { Item } from './types';

const CustomSelect = ({
  id,
  label,
  name,
  items,
  value,
  errorMessage = '',
  multiple = false,
  handleCheckItem,
  placeholder,
  style,
  ...props
}: CustomSelectProps) => {
  return (
    <FormControl>
      <Select
        {...props}
        displayEmpty
        size="medium"
        value={value}
        input={<OutlinedInput />}
        renderValue={(selected: any) => {
          if (selected?.length === 0) {
            return <em>{placeholder}</em>;
          }
          return selected?.join(', ');
        }}
        style={{
          ...styles.select_field_text,
          ...style
        }}
        inputProps={{ 'aria-label': 'Without label', 'data-testid': id }}
      >
        <MenuItem disabled value="">
          <em>{placeholder}</em>
        </MenuItem>
        {items.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {name}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText id="error_text" sx={styles.error_message}>
        {errorMessage}
      </FormHelperText>
    </FormControl>
  );
};

export default CustomSelect;
