const INITIAL_STATE = {
    user: [],
    users: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'traer_usuarios':
            return { ...state, users: action.payload };
        case 'get_user':
            return { ...state, user: action.payload };

        default: return state;
    };
};