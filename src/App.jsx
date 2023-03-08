import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Home from './Components/Home';
import NotFound from './Components/NotFound';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
import { ToastContainer } from 'react-toastify';
import Upload from './Components/Upload';
import ProtectedRoute from './Components/ProtectedRoute';
import useUserStore from './utils/userStore';



export default function App() {
  const user = useUserStore(state => state.user);
  const updateUser = useUserStore(state => state.updateUser);
  const clearUser = useUserStore(state => state.clearUser);

  const addUser = (args) => {
    updateUser(args);
  }

  const delUser = () => {
    clearUser();
  }

  useEffect(() => {
    axios({
      method: 'GET',
      url: '/api/auth/user'
    })
    .then(res => {
      addUser(res.data);
      console.log("User is authenticated");
    })
    .catch(err => {
      delUser();
      console.log("User is NOT authenticated");
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
        {/* <Route path="/upload" exact element={<Upload />} /> */}
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
      <Footer />
    </div>
  )
}