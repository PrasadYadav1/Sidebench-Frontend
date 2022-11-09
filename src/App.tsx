import { Typography } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './containers/layout';
import Login from './login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Layout />}>
          <Route
            path="/dashboard"
            element={<Typography component="div">Dashboard</Typography>}
          />
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
            element={<Typography component="div">Team</Typography>}
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
