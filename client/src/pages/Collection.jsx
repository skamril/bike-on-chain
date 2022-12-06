import React from "react";
import { Layout } from "../components/Layout";
import NavbarBoc from "../components/Navbar";

import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
  useContractRead,
  erc721ABI
  
} from 'wagmi'



export default function Collection() {
  const { address, connector, isConnected } = useAccount()
  // const { data: ensAvatar } = useEnsAvatar({ address })
  const { data: ensName } = useEnsName({ address })
  const { connect, connectors, error, pendingConnector } =
    useConnect()
  const { disconnect } = useDisconnect()

  
  const { data, isError, isLoading } = useContractRead({
      address: '0x9b293cac1a0f5fd66eaefed70e4900d0ff4f7d5f',
      abi: [
          {
              "inputs": [
                  {
                      "internalType": "string",
                      "name": "_desc",
                      "type": "string"
                  }
              ],
              "name": "addInformations",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
          },
          {
              "inputs": [],
              "stateMutability": "nonpayable",
              "type": "constructor"
          },
          {
              "anonymous": false,
              "inputs": [
                  {
                      "indexed": true,
                      "internalType": "address",
                      "name": "owner",
                      "type": "address"
                  },
                  {
                      "indexed": true,
                      "internalType": "address",
                      "name": "approved",
                      "type": "address"
                  },
                  {
                      "indexed": true,
                      "internalType": "uint256",
                      "name": "tokenId",
                      "type": "uint256"
                  }
              ],
              "name": "Approval",
              "type": "event"
          },
          {
              "anonymous": false,
              "inputs": [
                  {
                      "indexed": true,
                      "internalType": "address",
                      "name": "owner",
                      "type": "address"
                  },
                  {
                      "indexed": true,
                      "internalType": "address",
                      "name": "operator",
                      "type": "address"
                  },
                  {
                      "indexed": false,
                      "internalType": "bool",
                      "name": "approved",
                      "type": "bool"
                  }
              ],
              "name": "ApprovalForAll",
              "type": "event"
          },
          {
              "inputs": [
                  {
                      "internalType": "address",
                      "name": "to",
                      "type": "address"
                  },
                  {
                      "internalType": "uint256",
                      "name": "tokenId",
                      "type": "uint256"
                  }
              ],
              "name": "approve",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
          },
          {
              "anonymous": false,
              "inputs": [
                  {
                      "indexed": false,
                      "internalType": "uint256",
                      "name": "BikelId",
                      "type": "uint256"
                  }
              ],
              "name": "BikeRegistered",
              "type": "event"
          },
          {
              "anonymous": false,
              "inputs": [
                  {
                      "indexed": false,
                      "internalType": "uint256",
                      "name": "EntretienId",
                      "type": "uint256"
                  }
              ],
              "name": "EntretienEffectue",
              "type": "event"
          },
          {
              "inputs": [
                  {
                      "internalType": "address",
                      "name": "_player",
                      "type": "address"
                  },
                  {
                      "internalType": "string",
                      "name": "_tokenURI",
                      "type": "string"
                  },
                  {
                      "internalType": "uint256",
                      "name": "_serialNumber",
                      "type": "uint256"
                  },
                  {
                      "internalType": "string",
                      "name": "_description",
                      "type": "string"
                  },
                  {
                      "internalType": "string",
                      "name": "_brand",
                      "type": "string"
                  },
                  {
                      "internalType": "uint256",
                      "name": "",
                      "type": "uint256"
                  }
              ],
              "name": "MintBike",
              "outputs": [
                  {
                      "internalType": "uint256",
                      "name": "",
                      "type": "uint256"
                  }
              ],
              "stateMutability": "nonpayable",
              "type": "function"
          },
          {
              "inputs": [
                  {
                      "internalType": "address",
                      "name": "from",
                      "type": "address"
                  },
                  {
                      "internalType": "address",
                      "name": "to",
                      "type": "address"
                  },
                  {
                      "internalType": "uint256",
                      "name": "tokenId",
                      "type": "uint256"
                  }
              ],
              "name": "safeTransferFrom",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
          },
          {
              "inputs": [
                  {
                      "internalType": "address",
                      "name": "from",
                      "type": "address"
                  },
                  {
                      "internalType": "address",
                      "name": "to",
                      "type": "address"
                  },
                  {
                      "internalType": "uint256",
                      "name": "tokenId",
                      "type": "uint256"
                  },
                  {
                      "internalType": "bytes",
                      "name": "data",
                      "type": "bytes"
                  }
              ],
              "name": "safeTransferFrom",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
          },
          {
              "inputs": [
                  {
                      "internalType": "address",
                      "name": "operator",
                      "type": "address"
                  },
                  {
                      "internalType": "bool",
                      "name": "approved",
                      "type": "bool"
                  }
              ],
              "name": "setApprovalForAll",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
          },
          {
              "inputs": [
                  {
                      "internalType": "uint256",
                      "name": "_tokenId",
                      "type": "uint256"
                  },
                  {
                      "internalType": "string",
                      "name": "_enseigne",
                      "type": "string"
                  },
                  {
                      "internalType": "string",
                      "name": "_commentaire",
                      "type": "string"
                  }
              ],
              "name": "setEntretien",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
          },
          {
              "anonymous": false,
              "inputs": [
                  {
                      "indexed": false,
                      "internalType": "string",
                      "name": "MessageProprietaire",
                      "type": "string"
                  }
              ],
              "name": "StatusChange",
              "type": "event"
          },
          {
              "anonymous": false,
              "inputs": [
                  {
                      "indexed": true,
                      "internalType": "address",
                      "name": "from",
                      "type": "address"
                  },
                  {
                      "indexed": true,
                      "internalType": "address",
                      "name": "to",
                      "type": "address"
                  },
                  {
                      "indexed": true,
                      "internalType": "uint256",
                      "name": "tokenId",
                      "type": "uint256"
                  }
              ],
              "name": "Transfer",
              "type": "event"
          },
          {
              "inputs": [
                  {
                      "internalType": "address",
                      "name": "from",
                      "type": "address"
                  },
                  {
                      "internalType": "address",
                      "name": "to",
                      "type": "address"
                  },
                  {
                      "internalType": "uint256",
                      "name": "tokenId",
                      "type": "uint256"
                  }
              ],
              "name": "transferFrom",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
          },
          {
              "inputs": [
                  {
                      "internalType": "uint256",
                      "name": "_tokenId",
                      "type": "uint256"
                  },
                  {
                      "internalType": "string",
                      "name": "_newState",
                      "type": "string"
                  }
              ],
              "name": "updateState",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
          },
          {
              "inputs": [
                  {
                      "internalType": "address",
                      "name": "owner",
                      "type": "address"
                  }
              ],
              "name": "balanceOf",
              "outputs": [
                  {
                      "internalType": "uint256",
                      "name": "",
                      "type": "uint256"
                  }
              ],
              "stateMutability": "view",
              "type": "function"
          },
          {
              "inputs": [
                  {
                      "internalType": "uint256",
                      "name": "",
                      "type": "uint256"
                  }
              ],
              "name": "data",
              "outputs": [
                  {
                      "internalType": "uint256",
                      "name": "_serialNumber",
                      "type": "uint256"
                  },
                  {
                      "internalType": "string",
                      "name": "_description",
                      "type": "string"
                  },
                  {
                      "internalType": "string",
                      "name": "_brand",
                      "type": "string"
                  }
              ],
              "stateMutability": "view",
              "type": "function"
          },
          {
              "inputs": [
                  {
                      "internalType": "uint256",
                      "name": "",
                      "type": "uint256"
                  }
              ],
              "name": "entretien",
              "outputs": [
                  {
                      "internalType": "string",
                      "name": "_commentaire",
                      "type": "string"
                  },
                  {
                      "internalType": "string",
                      "name": "_enseigne",
                      "type": "string"
                  }
              ],
              "stateMutability": "view",
              "type": "function"
          },
          {
              "inputs": [
                  {
                      "internalType": "uint256",
                      "name": "tokenId",
                      "type": "uint256"
                  }
              ],
              "name": "getApproved",
              "outputs": [
                  {
                      "internalType": "address",
                      "name": "",
                      "type": "address"
                  }
              ],
              "stateMutability": "view",
              "type": "function"
          },
          {
              "inputs": [
                  {
                      "internalType": "uint256",
                      "name": "_tokenId",
                      "type": "uint256"
                  }
              ],
              "name": "getInfos",
              "outputs": [
                  {
                      "internalType": "string",
                      "name": "",
                      "type": "string"
                  },
                  {
                      "internalType": "string",
                      "name": "",
                      "type": "string"
                  },
                  {
                      "internalType": "uint256",
                      "name": "",
                      "type": "uint256"
                  }
              ],
              "stateMutability": "view",
              "type": "function"
          },
          {
              "inputs": [
                  {
                      "internalType": "address",
                      "name": "owner",
                      "type": "address"
                  },
                  {
                      "internalType": "address",
                      "name": "operator",
                      "type": "address"
                  }
              ],
              "name": "isApprovedForAll",
              "outputs": [
                  {
                      "internalType": "bool",
                      "name": "",
                      "type": "bool"
                  }
              ],
              "stateMutability": "view",
              "type": "function"
          },
          {
              "inputs": [],
              "name": "name",
              "outputs": [
                  {
                      "internalType": "string",
                      "name": "",
                      "type": "string"
                  }
              ],
              "stateMutability": "view",
              "type": "function"
          },
          {
              "inputs": [
                  {
                      "internalType": "uint256",
                      "name": "tokenId",
                      "type": "uint256"
                  }
              ],
              "name": "ownerOf",
              "outputs": [
                  {
                      "internalType": "address",
                      "name": "",
                      "type": "address"
                  }
              ],
              "stateMutability": "view",
              "type": "function"
          },
          {
              "inputs": [
                  {
                      "internalType": "uint256",
                      "name": "",
                      "type": "uint256"
                  }
              ],
              "name": "state",
              "outputs": [
                  {
                      "internalType": "string",
                      "name": "",
                      "type": "string"
                  }
              ],
              "stateMutability": "view",
              "type": "function"
          },
          {
              "inputs": [
                  {
                      "internalType": "bytes4",
                      "name": "interfaceId",
                      "type": "bytes4"
                  }
              ],
              "name": "supportsInterface",
              "outputs": [
                  {
                      "internalType": "bool",
                      "name": "",
                      "type": "bool"
                  }
              ],
              "stateMutability": "view",
              "type": "function"
          },
          {
              "inputs": [],
              "name": "symbol",
              "outputs": [
                  {
                      "internalType": "string",
                      "name": "",
                      "type": "string"
                  }
              ],
              "stateMutability": "view",
              "type": "function"
          },
          {
              "inputs": [
                  {
                      "internalType": "uint256",
                      "name": "tokenId",
                      "type": "uint256"
                  }
              ],
              "name": "tokenURI",
              "outputs": [
                  {
                      "internalType": "string",
                      "name": "",
                      "type": "string"
                  }
              ],
              "stateMutability": "view",
              "type": "function"
          }
      ],
      functionName: 'getInfos',
    })
 
  if (isConnected) {
    return (
      <div>
        {/* <img src={ensAvatar} alt="ENS Avatar" /> */}
        <div>{ensName ? `${ensName} (${address})` : address}</div>
        {/* <div>Connected to {connector.name}</div> */}
        <button onClick={disconnect}>Disconnect</button>
      </div>
    )
  }
 
  return (
    <div>
      {connectors.map((connector) => (
        <button
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
        >
          {connector.name}
          {!connector.ready && ' (unsupported)'}
          {/* {isLoading &&
            connector.id === pendingConnector?.id &&
            ' (connecting)'} */}
        </button>
      ))}
 
      {error && <div>{error.message}</div>}
    </div>
  )
}