import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { object, string } from 'zod';
import InputField from '../../components/elements/inputField';
import styles from './styles';
import InputData from './types';

const validationSchema = object({
  email: string({
    required_error: 'Please provide an email'
  }).email({ message: 'Please provide a valid email address' })
});

const ForgotPassword: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<InputData>({
    defaultValues: {
      email: ''
    },
    resolver: zodResolver(validationSchema)
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
  });

  return (
    <Box sx={styles.box_container}>
      <Typography data-testid="main-header-text" sx={styles.header_text}>
        Moony Dashboard
      </Typography>
      <Box sx={styles.reset_box}>
        <Typography data-testid="header-text" sx={styles.reset_header}>
          Forgot Password
        </Typography>
        <Typography data-testid="sub-header-text" sx={styles.reset_sub_header}>
          Don’t worry we got your back
        </Typography>
        <form onSubmit={onSubmit} style={styles.form_container}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                id="email"
                type="text"
                placeholder="Your email"
                error={!!errors.email?.message}
                errorMessage={errors.email?.message}
                style={{ ...styles.email_field }}
              />
            )}
          />
          <Button
            data-testid="send-email-button"
            sx={styles.button}
            type="submit"
            color="secondary"
            variant="contained"
          >
            Send Email
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
