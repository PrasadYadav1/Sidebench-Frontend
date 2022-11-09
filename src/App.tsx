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
            element={<Typography>Dashboard</Typography>}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
