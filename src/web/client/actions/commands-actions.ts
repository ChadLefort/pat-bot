import * as actions from './';
import * as request from 'axios';
import { Dispatch } from 'redux';



// export function fetchCommands() {
//     return (dispatch: Dispatch<any>) => {
//         request.get('/api/commands')
//             .then((response) => {
//                 dispatch({ type: actions.FETCH_COMMANDS_FULFILLED, payload: response.data });
//             })
//             .catch((error) => {
//                 dispatch({ type: actions.FETCH_COMMANDS_REJECTED, payload: error });
//             });
//     };
// }

export function fetchCommands() {
    return {
        type: actions.FETCH_COMMANDS,
        payload: request.get('/api/commands'),
    };
}
