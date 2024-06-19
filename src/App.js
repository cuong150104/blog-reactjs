import './App.css';
import './css/styles.css';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import Main from './layouts/Main';
import PrivateRoutes from './layouts/PrivateRoutes';
import PublicRoutes from './layouts/PublicRoutes';
import Layout from './layouts/Layout';
import 'react-toastify/dist/ReactToastify.css';
import UserList from './components/user/UserList';
import UserAdd from './components/user/UserAdd';
import UserUpdate from './components/user/UserUpdate';
import PageNotFound from './PageNotFound';
import Profile from './components/Profile';
import PostList from './components/post/PostList';
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<Main />}>
          <Route element={<PrivateRoutes />}>
            <Route path='/' element={<Dashboard />} />
            <Route path='/users' element={<UserList />} />
            <Route path='/user/add' element={<UserAdd />} />
            <Route path='/user/edit/:id' element={<UserUpdate />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/posts' element={<PostList />} />
          </Route>
        </Route>
        <Route element={<PublicRoutes />}>
          <Route path='/login' element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Route>
      <Route path='*' element={<PageNotFound />}></Route>
    </Routes>
  );
}

export default App;
