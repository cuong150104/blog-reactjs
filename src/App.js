import './App.css';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import Main from './layouts/Main';
import PrivateRoutes from './layouts/PrivateRoutes';
import PublicRoutes from './layouts/PublicRoutes';
import Layout from './layouts/Layout';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<Main />}>
          <Route element={<PrivateRoutes />}>
            <Route path='/' element={<Dashboard />} />
          </Route>
        </Route>
        <Route element={<PublicRoutes />}>
          <Route path='/login' element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
