const INITIAL_STATE = {
    publications: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'get_publications':
            return { ...state, publications: action.payload };

        default: return state;
    };
};