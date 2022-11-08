import React from 'react';
import {
  Box,
  Button,
  Checkbox,
  Grid,
  Link,
  Paper,
  Typography
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { object, string } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '../components/elements/inputField';
import LoginData from './types';
import styles from './styles';

const validationSchema = object({
  email: string({
    required_error: 'Please provide an email'
  }).email({ message: 'Please provide a valid email address' }),
  password: string({
    required_error: 'Please provide a password'
  }).min(8, 'Password length must be 8 characters')
});

const Login: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<LoginData>({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: zodResolver(validationSchema)
  });

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <Grid container component="main" sx={styles.root}>
      <Box sx={styles.box_container}>
        <Typography sx={styles.header_text} data-testid="login_title">
          Moony Dashboard
        </Typography>
        <Box sx={styles.login_form}>
          <Typography sx={styles.login_form_header} data-testid="login_header">
            Welcome Back
          </Typography>
          <Typography
            sx={styles.login_form_sub_header}
            data-testid="login_sub_header"
          >
            Fill out to login into your account
          </Typography>

          <form onSubmit={onSubmit} style={styles.form_conatiner}>
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
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <InputField
                  {...field}
                  id="password"
                  type="password"
                  placeholder="Password"
                  error={!!errors.password?.message}
                  errorMessage={errors.password?.message}
                  style={styles.mt}
                />
              )}
            />

            <div style={styles.remember_forgot_password_grid}>
              <div style={styles.remember_text_grid}>
                <Checkbox
                  value="remember"
                  color="primary"
                  sx={styles.checkbox}
                />
                <Typography
                  data-testid="sign_in_remember"
                  variant="body2"
                  sx={styles.remember_me}
                >
                  Remember me
                </Typography>
              </div>
              <div>
                <Link
                  data-testid="forgot_password"
                  href="/forgot-password"
                  variant="body2"
                  underline="none"
                  sx={styles.forgot_password}
                >
                  Forgot Password?
                </Link>
              </div>
            </div>
            <Button
              sx={styles.sign_in_button}
              data-testid="sign_in"
              type="submit"
              color="secondary"
              variant="contained"
            >
              Sign In
            </Button>
          </form>
        </Box>
      </Box>
    </Grid>
  );
};

export default Login;
