import { Routes, Route } from 'react-router-dom';

import Login from './Login'; 
import Register from './Register';
import Dashboard from './Dashboard';

function App() {
  return (
    // Yahan se humne <Router> hata diya hai kyunki wo main.jsx mein pehle se hoga
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;