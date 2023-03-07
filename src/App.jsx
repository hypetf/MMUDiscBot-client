import { useState, createContext } from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import NotFound from './Components/NotFound';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
import { ToastContainer } from 'react-toastify';
import Upload from './Components/Upload';

export const UserContext = createContext();

export default function App() {
  return (
    <div className='App'>
      <Navbar />

      <UserContext.Provider>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/home" exact element={<Home />} />
          <Route path="/upload" exact element={<Upload />} />
          <Route path="*" element={<NotFound /> } />
        </Routes>
      </UserContext.Provider>

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