import './App.css';
import './css/styles.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
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
import PostAdd from './components/post/PostAdd';
import PostUpdate from './components/post/PostUpdate';
import Navbar from './components/Client/Navbar/Navbar';
import Home from './pages/Home/Home'
import Post from './pages/Post/Post';
import ProfileUser from './pages/ProfileUser/ProfileUser';
import WritePost from './pages/WritePost/WritePost';
import MyContents from './pages/MyContents/MyContents';
function App() {
  const [reload, setReload] = useState(false);

  let token = localStorage.getItem('access_token') || false;
  let roles = localStorage.getItem('roles') || false;

  useEffect(() => {
    // Add any side effects or data fetching here
  }, [token, roles, reload]);

  // console.log("check =>", token, roles);

  const handleReload = () => {
    setReload(!reload);
  };

  const renderAdminRoutes = () => (
    <Route element={<Main />}>

      <Route element={<PrivateRoutes />}>
        <Route path='/' element={<Dashboard />} />
        <Route path='/users' element={<UserList />} />
        <Route path='/user/add' element={<UserAdd />} />
        <Route path='/user/edit/:id' element={<UserUpdate />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/posts' element={<PostList />} />
        <Route path='/post/add' element={<PostAdd />} />
        <Route path='/post/edit/:id' element={<PostUpdate />} />

      </Route>
      <Route element={<PublicRoutes />}>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/post/:id' element={<Post />} />
        <Route path='/login' element={<Login onLogin={handleReload} />} />
        <Route path="/register" element={<Register />} />
      </Route>

    </Route>
  );

  const renderUserRoutes = () => (
    <Route element={<Layout />}>
      <Route element={<PrivateRoutes />}>
        <Route path='/' element={<Home />} />
        <Route path='/post/:id' element={<Post />} />
        <Route path='/profile-user' element={<ProfileUser />} />
        <Route path='/user/post/add' element={<WritePost />} />
        <Route path='/user/my-contents' element={<MyContents />} />
        <Route path='/post/edit/:id' element={<PostUpdate />} />
      </Route>
      <Route element={<PublicRoutes />}>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/post/:id' element={<Post />} />
        <Route path='/login' element={<Login onLogin={handleReload} />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Route>
  );

  const renderClientRoutes = () => (
    <Route element={<Layout />}>
      <Route element={<PublicRoutes />}>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/post/:id' element={<Post />} />
        <Route path='/login' element={<Login onLogin={handleReload} />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Route>
  );

  return (
    <Routes>
      {token ? (
        roles === "Admin" ? (
          renderAdminRoutes()
        ) : roles === "User" ? (
          renderUserRoutes()
        ) : (
          renderClientRoutes()
        )
      ) : (
        renderClientRoutes()
      )}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );

}

export default App;
