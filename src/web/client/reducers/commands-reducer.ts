import * as actions from '../actions';

const initialState: any = {
    commands: [],
    fetching: false,
    fetched: false,
    error: null,
};

export default function reducer(state = initialState, action: any) {
    switch (action.type) {
        case actions.FETCH_COMMANDS_PENDING: {
            return Object.assign({}, state, { fetching: true });
        }
        case actions.FETCH_COMMANDS_REJECTED: {
            return Object.assign({}, state, { fetching: false, error: action.payload });
        }
        case actions.FETCH_COMMANDS_FULFILLED: {
            return Object.assign({}, state, { fetching: false, fetched: true, commands: action.payload.data });
        }
        default:
            return state;
    }
}
