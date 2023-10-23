const initialState = {
    isStartMenuOpen: false,
    isCalendarOpen: false,
};

export const windowReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE_START_MENU':
            return {
                ...state,
                isStartMenuOpen: !state.isStartMenuOpen,
            };
        case 'TOGGLE_CALENDAR':
            return {
                ...state,
                isCalendarOpen: !state.isCalendarOpen,
            };
        default:
            return state;
    }
};
