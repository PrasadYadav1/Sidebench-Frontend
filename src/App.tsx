import { Typography } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './containers/dashboard';
import Layout from './containers/layout';
import Login from './login';
import Admin from './containers/admin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
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
    </BrowserRouter>
  );
}

export default App;
