import { useReducer, useCallback, useEffect } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";
import PropTypes from "prop-types";

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const init = useCallback(async (artifact) => {
    if (artifact) {
      const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
      const accounts = await web3.eth.requestAccounts();
      const networkID = await web3.eth.net.getId();
      const { abi } = artifact;
      let address, contract;
      try {
        address = import.meta.env.VITE_CONTRACT_ADDRESS;
        contract = new web3.eth.Contract(abi, address);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
      }

      dispatch({
        type: actions.init,
        data: {
          artifact,
          web3,
          accounts,
          networkID,
          contract,
          // Extra
          account: accounts[0],
          isConnected: !!accounts[0],
          isOwner:
            (await contract.methods.owner().call({ from: accounts[0] })) ===
            accounts[0],
          loadStatus: "loaded",
        },
      });
    }
  }, []);

  useEffect(() => {
    const tryInit = async () => {
      try {
        const artifact = await import(
          "../../../contracts/BikeCollectionFactory.json"
        );
        init(artifact);
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
      init(state.artifact);
    };

    events.forEach((e) => window.ethereum.on(e, handleChange));
    return () => {
      events.forEach((e) => window.ethereum.removeListener(e, handleChange));
    };
  }, [init, state.artifact]);

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
