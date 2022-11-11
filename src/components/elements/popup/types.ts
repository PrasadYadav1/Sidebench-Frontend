import { ModalProps } from '@mui/material';
import { ReactNode } from 'react';

interface PopupProps extends ModalProps {
  title: string;
  description: ReactNode;
  open: boolean;
  handleClose: (e: React.ChangeEvent<HTMLInputElement>) => void;
  textAlign: 'left' | 'center' | 'right';
}
export default PopupProps;
