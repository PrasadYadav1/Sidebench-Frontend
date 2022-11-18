import { Box, Button, Typography } from '@mui/material';
import { object, string, ZodIssueCode } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import InputField from '../elements/inputField';
import styles from './styles';
import PasswordChangeSuccess from '../passwordChangeSuccess';
import InputData from './types';

const validationSchema = object({
  password: string({
    required_error: 'Please provide a password'
  }).min(8, 'Password length must be 8 characters'),
  confirmPassword: string({
    required_error: 'Please provide a password'
  }).min(8, 'Password length must be 8 characters')
}).superRefine((val, ctx) => {
  if (val.password !== val.confirmPassword) {
    ctx.addIssue({
      code: ZodIssueCode.custom,
      path: ['confirmPassword'],
      message: 'Password and Confirm password does not match'
    });
  }
});

const ResetPassword: React.FC = () => {
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<InputData>({
    defaultValues: {
      password: '',
      confirmPassword: ''
    },
    resolver: zodResolver(validationSchema)
  });

  const onSubmit = handleSubmit(async (data) => {
    // API
    setIsSuccess(false);
    console.log(data);
  });

  return isSuccess ? (
    <PasswordChangeSuccess />
  ) : (
    <Box sx={styles.box_container}>
      <Typography data-testid="main-header-text" sx={styles.header_text}>
        Moony Dashboard
      </Typography>
      <Box sx={styles.reset_box}>
        <Typography data-testid="header-text" sx={styles.header}>
          Reset Password
        </Typography>
        <Typography data-testid="sub-header-text" sx={styles.sub_header}>
          Set up a new password for you
        </Typography>
        <form onSubmit={onSubmit} style={styles.form_container}>
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
                style={{ ...styles.fields }}
              />
            )}
          />
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                error={!!errors.confirmPassword?.message}
                errorMessage={errors.confirmPassword?.message}
                style={{ ...styles.fields }}
              />
            )}
          />
          <Button data-testid="confirm-button" sx={styles.button} type="submit">
            Confirm
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default ResetPassword;
