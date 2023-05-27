import { useState, useEffect, createContext } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Web3 from 'web3';

// Components
import Layout from "@components/Layout";
import Home from "@components/Home";
import SmartContract from "@components/SmartContract";
import PageNotFound from "@components/PageNotFound";

export const AuthContext = createContext(false);

function App() {
  const web3 = new Web3(Web3.givenProvider);

  const [loggedIn, setLoggedIn] = useState(false);
  const [ethWallet, setEthWallet] = useState(null);
  const [userAcc, setUserAcc] = useState(null);
  const [connectError, setConnectError] = useState(null);
  
  const contextVal = {
    authenticated: loggedIn,
    ethWallet: ethWallet,
    userAcc: userAcc,
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

    const userAcc = await web3.eth.getAccounts();
    
    if(userAcc.length > 0) {
      await setUserAcc(userAcc[0]);
      await setLoggedIn(true);
    } else {
      if (loggedIn) { 
        await setUserAcc(null);
        await setLoggedIn(false);
      }
    }
  }

  async function connectWallet() {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      await setLoggedIn(true);

      if (connectError !== null) { setConnectError(null); }

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
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="smart-contract" element={<SmartContract />} />
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  )
}

export default App;
