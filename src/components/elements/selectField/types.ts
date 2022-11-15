import { SelectProps } from '@mui/material';

interface CustomSelectProps extends SelectProps {
  items: Item[];
  errorMessage?: string | undefined;
  handleCheckItem?: (checked: boolean, item: number) => void;
}

export interface Item {
  name: string;
  value: number | string;
}
export default CustomSelectProps;
