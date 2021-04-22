const INITIAL_STATE = {
  totalHeight: 0,
  theme: 0,
  alertsViewRef: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "getTotalHeight":
      return {
        ...state,
        totalHeight: action.payload,
      };
    case "setTotalHeight":
      action = {
        ...state,
        totalHeight: action.payload,
      };
      return action;
    case "setTheme":
      action = {
        ...state,
        theme: action.payload,
      };
      return action;
    case "getTheme":
      action = {
        ...state,
        theme: action.payload,
      };
      return action;
    case "setAlertsViewRef":
      action = {
        ...state,
        theme: action.payload,
      };
      return action;
    case "getAlertsViewRef":
      action = {
        ...state,
        theme: action.payload,
      };
      return action;
    default:
      return state;
  }
};
