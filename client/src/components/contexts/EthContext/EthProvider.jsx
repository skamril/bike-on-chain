import { useReducer, useCallback, useEffect } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const init = useCallback(async (artifacts) => {
    if (artifacts) {
      const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
      const accounts = await web3.eth.requestAccounts();
      const account = accounts ? accounts[0] : null;
      const networkID = await web3.eth.net.getId();
      let address, contract;
      try {
        address = import.meta.env.VITE_CONTRACT_ADDRESS;
        contract = new web3.eth.Contract(artifacts.factory.abi, address);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
      }

      dispatch({
        type: actions.init,
        data: {
          artifacts,
          web3,
          accounts,
          networkID,
          contract,
          // Extra
          account,
          isConnected: !!account,
          isOwner:
            (await contract.methods.owner().call({ from: account })) ===
            account,
          isManufacturer:
            (await contract.methods
              .isCollectionOwner()
              .call({ from: account })) === true,
          loadStatus: "loaded",
          getCollection: async (addr) => {
            const address =
              addr ||
              (await contract.methods.getCollection().call({ from: account }));
            return new web3.eth.Contract(artifacts.collection.abi, address);
          },
        },
      });
    }
  }, []);

  useEffect(() => {
    const tryInit = async () => {
      try {
        const artifacts = {
          factory: await import(
            "../../../contracts/BikeCollectionFactory.json"
          ),
          collection: await import("../../../contracts/BikeCollection.json"),
        };
        init(artifacts);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    };

    tryInit();
  }, [init]);

  useEffect(() => {
    const events = ["chainChanged", "accountsChanged"];
    const handleChange = () => {
      navigate("/");
      location.reload();
    };

    events.forEach((e) => window.ethereum.on(e, handleChange));

    return () => {
      events.forEach((e) => window.ethereum.removeListener(e, handleChange));
    };
  }, [init, navigate]);

  return (
    <EthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </EthContext.Provider>
  );
}

EthProvider.propTypes = {
  children: PropTypes.node,
};

export default EthProvider;
