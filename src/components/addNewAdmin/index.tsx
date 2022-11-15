import { Button, Grid, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import InputField from '../elements/inputField';
import Popup from '../elements/popup';
import CustomSelect from '../elements/selectField';
import styles from './styles';
import AddNewAdminProps from './types';

const AddNewAdmin = ({ addNewAdmin, setAddNewAdmin }: AddNewAdminProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: {
      fullname: '',
      email: '',
      role: 0
    }
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
  });

  return (
    <Popup
      id="addNewAdmin"
      open={addNewAdmin}
      title=""
      textAlign="center"
      handleClose={() => setAddNewAdmin(false)}
      handleClickIcon={() => setAddNewAdmin(false)}
      description={<></>}
      style={styles.popup_conatiner}
    >
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <img alt="" src="/images/profile.png" style={styles.img_profile} />
        <Typography
          component="div"
          data-testid="admin-text"
          style={styles.text1}
        >
          Add new Admin
        </Typography>
        <Typography
          component="div"
          data-testid="admin-sub-text"
          style={styles.text2}
        >
          Enter Admin Name and Email
        </Typography>
        <form onSubmit={onSubmit} style={styles.form}>
          <Controller
            name="fullname"
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                id="fullname"
                type="text"
                placeholder="Full Name"
                error={!!errors.fullname?.message}
                errorMessage={errors.fullname?.message}
                style={styles.input_field}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                id="email"
                type="text"
                placeholder="Email"
                error={!!errors.email?.message}
                errorMessage={errors.email?.message}
                style={styles.input_field}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <CustomSelect
                {...field}
                name="role"
                placeholder="Choose Role"
                id="roleId"
                items={[]}
                error={!!errors.role?.message}
                errorMessage={errors.role?.message}
                style={styles.select_field}
              />
            )}
          />
          <br />
          <Button
            data-testid="sign_in"
            type="submit"
            color="secondary"
            variant="contained"
            style={styles.button}
          >
            Invite
          </Button>
        </form>
      </Grid>
    </Popup>
  );
};
export default AddNewAdmin;
