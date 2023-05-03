import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Home from './Components/Home';
import NotFound from './Components/NotFound';
import Navbar from './Components/Navbar/Navbar';
import { ToastContainer } from 'react-toastify';
import Upload from './Components/Upload';
import Logout from './Components/Logout';
import ProtectedRoute from './Components/ProtectedRoute';
import useUserStore from './utils/userStore';
import useSongsStore from './utils/songsStore'


export default function App() {
  const updateUser = useUserStore(state => state.updateUser);
  const clearUser = useUserStore(state => state.clearUser);
  const clearSongs = useSongsStore(state => state.clearSongs);

  useEffect(() => {
    axios({
      method: 'GET',
      url: '/api/auth/user'
    })
    .then(res => {
      updateUser(res.data);
    })
    .catch(err => {
      clearUser();
      clearSongs();
      if (err.response.status === 401) {
        document.cookie = "connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        sessionStorage.clear();
        return;
      }
      else
        console.log(err);
    });
  }, []);

  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path="*" element={<NotFound /> } />
        <Route path="/" exact element={<Home />} />
        <Route path="/home" exact element={<Navigate replace to="/" />} />
        <Route path="/upload" element={
          <ProtectedRoute children={<Upload />} />
        } />

        <Route path="/logout" element={
          <ProtectedRoute children={<Logout />} />
        } />

      </Routes>

      <ToastContainer
        position="bottom-right"
        autoClose={3500}
        newestOnTop
        closeOnClick
        rtl={false}
        draggable
        theme="dark"
        closeButton={false}
        pauseOnFocusLoss={false}
        limit={2}
      />
    </div>
  )
}