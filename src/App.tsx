import { Grid, Typography } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './containers/dashboard';
import Layout from './containers/layout';
import Login from './login';
import Admin from './containers/admin';
import styles from './login/styles';
import ResetPassword from './containers/resetPassword';
import ForgotPassword from './containers/forgotPassword';

function App() {
  return (
    <BrowserRouter>
      <Grid container component="main" sx={styles.root}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/change-password" element={<ResetPassword invite />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/inventory"
              element={<Typography component="div">Inventory</Typography>}
            />
            <Route
              path="/customer-list"
              element={<Typography component="div">Customer List</Typography>}
            />
            <Route
              path="/team"
              element={
                <Typography component="div">
                  <Admin />
                </Typography>
              }
            />
            <Route
              path="/settings"
              element={<Typography component="div">Settings</Typography>}
            />
          </Route>
        </Routes>
      </Grid>
    </BrowserRouter>
  );
}

export default App;
