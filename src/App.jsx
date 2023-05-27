import { useState, createContext } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Layout from "@components/Layout";
import Home from "@components/Home";
import Features from "@components/Features";
import Contact from "@components/Contact";
import PageNotFound from "@components/PageNotFound";

export const AuthContext = createContext(false);

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  
  const contextVal = {
    authenticated: loggedIn,
    mmLogin: mmLogin,
    mmLogout: mmLogout
  };

  async function mmLogin() {
    await setLoggedIn(true);
  }

  async function mmLogout() {
    await setLoggedIn(false);
  }

  return (
    <>
      <AuthContext.Provider value={contextVal}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <Layout />
            }>
              <Route index element={<Home />} />
              <Route path="features" element={<Features />} />
              <Route path="contact" element={<Contact />} />
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  )
}

export default App;
