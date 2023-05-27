import { useContext } from 'react';

// Context
import { AuthContext } from "@src/App";

const Home = () => {
  const context = useContext(AuthContext);

  return (
    <>
      <main className="px-3">
        {!context.authenticated ? (
          <>
            <h1>Connect your wallet</h1>
            
            {!context.ethWallet ? (
              <p className="lead">
                Please install MetaMask wallet to continue.
              </p>
            ) : (
              <>
                <p className="lead">
                  Please connect your MetaMask wallet to continue.
                </p>

                {context.connectionErr !== null && (
                  <p className="lead error">
                    Error: {context.connectionErr}
                  </p>
                )}
              </>
            )}

          </>
        ) : (
          <>
            <h1>Welcome, User!</h1>
            <p className="lead">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque ex sequi corporis recusandae iure, alias ipsa, doloribus esse modi ipsam amet reprehenderit impedit labore? Qui modi perferendis aut ea voluptates.
            </p>
          </>
        )}

        {/* <p className="lead">
          <a href="#" className="btn btn-lg btn-secondary fw-bold border-white bg-white">Learn more</a>
        </p> */}
      </main>
    </>
  )
}

export default Home
