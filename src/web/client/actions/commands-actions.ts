import { IAction } from '../interfaces/actions';
import * as actions from './';
import * as request from 'axios';

export function fetchCommands(): IAction<any> {
    return {
        type: actions.FETCH_COMMANDS,
        payload: request.get('/api/commands'),
    };
}
