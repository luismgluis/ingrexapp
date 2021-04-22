import { Business } from "../libs/api/interfaces";
interface TheInitialState {
  currentBusiness: Business;
}
const INITIAL_STATE: TheInitialState = {
  currentBusiness: new Business(),
};

export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case "setCurrentBusiness":
      return {
        ...state,
        currentBusiness: action.payload,
      };
    default:
      return state;
  }
};
