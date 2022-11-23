import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styles from './styles';

const PasswordChangeSuccess: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <Box sx={styles.container}>
      <img alt="" src="/images/tick-circle.png" style={styles.tick} />
      <Typography data-testid="header-text" sx={styles.header}>
        Password Reset
      </Typography>
      <Typography data-testid="sub-header-text" sx={styles.sub_header}>
        Your new password has been successfully reset
      </Typography>
      <Button
        data-testid="continue-button"
        onClick={handleClick}
        sx={styles.button}
        color="secondary"
        variant="contained"
      >
        Continue
      </Button>
    </Box>
  );
};

export default PasswordChangeSuccess;
