const actions = {
  init: "INIT",
  update: "UPDATE",
  addProposalId: "ADD_PROPOSAL_ID",
};

const initialState = {
  artifact: null,
  web3: null,
  accounts: null,
  networkID: null,
  contract: null,
  isOwner: false,
  isManufacturer: false,
  account: false,
  isConnected: false,
  loadStatus: "idle",
  getCollection: null,
};

const reducer = (state, action) => {
  const { type, data } = action;
  switch (type) {
    case actions.init:
    case actions.update:
      return { ...state, ...data };
    case actions.addProposalId:
      return {
        ...state,
        proposalIds: [...new Set([...state.proposalIds, data])],
      };
    default:
      throw new Error("Undefined reducer action type");
  }
};

export { actions, initialState, reducer };
