import { useState, useEffect, createContext } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Web3 from 'web3';

// Components
import Layout from "@components/Layout";
import Home from "@components/Home";
import Features from "@components/Features";
import Contact from "@components/Contact";
import PageNotFound from "@components/PageNotFound";

export const AuthContext = createContext(false);

function App() {
  // const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
  // web3.eth.defaultChain = "mumbai";

  const [loggedIn, setLoggedIn] = useState(false);
  const [ethWallet, setEthWallet] = useState(null);
  const [connectError, setConnectError] = useState(null);
  
  const contextVal = {
    authenticated: loggedIn,
    ethWallet: ethWallet,
    connectionErr: connectError,
    mmLogin: connectWallet,
    mmLogout: mmLogout
  };

  async function mmLogout() {
    await setLoggedIn(false);
  }

  async function checkWalletConnection() {
    const ethereum = window;
    await setEthWallet((!ethereum ? false : true));
  }

  async function connectWallet() {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      window.web3 = new Web3(window.ethereum);
      await setLoggedIn(true);

      if (connectError !== null) { setConnectError(null); }

      console.log(window.web3);

      return;
    } catch (error) {
      setConnectError(error.message);
      console.error(error);
      return;
    }
  }

  useEffect(() => { 
    if (ethWallet === null) { checkWalletConnection(); }
  }, [ethWallet]);

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
