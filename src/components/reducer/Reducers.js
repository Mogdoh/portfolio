
const initialState = {
    isOpen: false,
};

export const startMenuReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE_START_MENU':
            return {
                ...state,
                isOpen: !state.isOpen,
            };
            default:
                return state;
    }
};