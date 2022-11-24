import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Typography
} from '@mui/material';
import { object, string, ZodIssueCode } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import styles from './styles';
import PasswordChangeSuccess from '../passwordChangeSuccess';
import InputData from './types';
import { putApiWithAuth } from '../../utils/apis';
import getAPIUrl from '../../config';
import { getApiErrorMessage } from '../../utils/commonHelpers';
import InputField from '../../components/elements/inputField';
import Toast from '../../components/elements/toast';

const validationSchema = object({
  password: string({
    required_error: 'Please provide a password'
  }).min(8, 'Password must be atleast 8 characters long'),
  confirmPassword: string({
    required_error: 'Please provide a password'
  }).min(8, 'Password must be atleast 8 characters long')
}).superRefine((val, ctx) => {
  if (val.password !== val.confirmPassword) {
    ctx.addIssue({
      code: ZodIssueCode.custom,
      path: ['confirmPassword'],
      message: 'Password and Confirm password does not match'
    });
  }
});

const ResetPassword: React.FC<{ invite?: boolean }> = ({ invite = false }) => {
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);
  const [toastErrorMsg, setToastErrorMsg] = useState<string>('');
  const [errorToast, setErrorToast] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

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
    if (invite) {
      try {
        await putApiWithAuth(`${getAPIUrl()}/admins/change-password`, {
          password: data.password,
          confirmPasswrd: data.confirmPassword
        });
        setIsSuccess(true);
      } catch (error) {
        if (error instanceof Error) {
          const errMsg = getApiErrorMessage(error);
          setToastErrorMsg(errMsg);
          setErrorToast(true);
        }
      }
    }
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseDownConfirmPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return isSuccess ? (
    <PasswordChangeSuccess />
  ) : (
    <>
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
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  error={!!errors.password?.message}
                  errorMessage={errors.password?.message}
                  style={styles.fh}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? (
                            <img alt="" src="eye-slash.svg" />
                          ) : (
                            <img alt="" src="eye-slash.svg" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
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
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  error={!!errors.confirmPassword?.message}
                  errorMessage={errors.confirmPassword?.message}
                  style={{ ...styles.mt, ...styles.fh }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownConfirmPassword}
                        >
                          {showConfirmPassword ? (
                            <img alt="" src="eye-slash.svg" />
                          ) : (
                            <img alt="" src="eye-slash.svg" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              )}
            />
            <Button
              data-testid="confirm-button"
              sx={styles.button}
              type="submit"
              color="secondary"
              variant="contained"
            >
              Confirm
            </Button>
          </form>
        </Box>
      </Box>
      <Toast
        id="admin-error"
        open={errorToast}
        message={toastErrorMsg}
        severity="error"
        onClose={() => setErrorToast(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        alertStyles={styles.toastText}
      />
    </>
  );
};

export default ResetPassword;
