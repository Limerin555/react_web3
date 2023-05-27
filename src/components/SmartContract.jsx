import { useState, useEffect } from 'react';
import { useContext } from 'react';
import Web3 from 'web3';

// Context
import { AuthContext } from "@src/App";

// Helper
import { contractAbi } from "@utils/helper";

const SmartContract = () => {
  const context = useContext(AuthContext);

  const web3 = new Web3(Web3.givenProvider);
  const contractAdd = import.meta.env.VITE_CONTRACT_ADD;
  const contract = new web3.eth.Contract(contractAbi(), contractAdd);

  const [error, setError] = useState(null);
  const [adminCount, setAdminCount] = useState("?");
  const [secAdminCount, setSecAdminCount] = useState("?");
  const [mintsLeft, setMintsLeft] = useState("?");

  // Default error message
  const msg = "Transaction failed. Check your wallet transactions for more details.";

  // WRITE FUNCTIONS
  // Call incDefAdminCount write function in the smart contract
  async function incrAdminCount() {
    try {
      await contract.methods.incDefAdminCount().send({ from: context.userAcc });
      await getAdminCount();
    } catch(error) {
      setError(error);
      console.error(error);
      return;
    }
  }

  // Call incSecAdminCount write function in the smart contract
  async function incrSecAdminCount() {
    try {
      await contract.methods.incSecAdminCount().send({ from: context.userAcc });
      await getSecAdminCount();
    } catch(error) {
      setError(error);
      console.error(error);
      return;
    }
  }

  // Call mintNft write function in the smart contract
  async function decMintsLeft() {
    try {
      await contract.methods.mintNft().send({ from: context.userAcc });
      await getMintsLeft();
    } catch(error) {
      setError(error);
      console.error(error);
      return;
    }
  }

  // READ FUNCTIONS
  // Call getDefAdminCount read function in the smart contract
  async function getAdminCount() {
    try {
      const count = await contract.methods.getDefAdminCount().call();
      setAdminCount(count);
      return;
    } catch(error) {
      setError(msg);
      console.error(error);
      return;
    }
  }

  // Call getSecAdminCount read function in the smart contract
  async function getSecAdminCount() {
    try {
      const count = await contract.methods.getSecAdminCount().call();
      setSecAdminCount(count);
      return;
    } catch (error) {
      setError(msg);
      console.error(error);
      return;
    }
  }

  // Call getMintsLeft read function in the smart contract
  async function getMintsLeft() {
    try {
      const count = await contract.methods.getMintsLeft().call();
      setMintsLeft(count);
      return;
    } catch (error) {
      setError(msg);
      console.error(error);
      return;
    }
  }

  // Get all counts on page load
  useEffect(() => {
    getAdminCount();
    getSecAdminCount();
    getMintsLeft();
  }, []);

  return (
    <>
      <main className="px-3">
        <p className="lead">
          This is where you interact with your smart contract
        </p>

        <div className="d-flex flex-column">
          <button className="btn btn-outline-secondary mb-3" onClick={incrAdminCount}>
            Increment Default Admin Count (Count: { adminCount })
          </button>
          <button className="btn btn-outline-secondary mb-3" onClick={incrSecAdminCount}>
            Increment 2nd Admin Count (Count: { secAdminCount })
          </button>
          <button className="btn btn-outline-secondary" onClick={decMintsLeft}>
            Decrement Mints Left (Count: { mintsLeft })
          </button>
        </div>

        {error !== null && (
          <p className="lead error-text mt-4">
            Error: { error }
          </p>
        )}
      </main>
    </>
  )
}

export default SmartContract
