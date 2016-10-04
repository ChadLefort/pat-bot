import * as handlers from './commands';

export default class InstanceLoader {
    public static getInstance<T>(className: string): T {
        return <T>(<any>handlers)[className].getInstance();
    }
}
