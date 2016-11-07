import CommmandsStore from './stores/commands-store';

export type PageName = 'commands'
export const pageNames: PageName[] = ['commands'];

export interface IStores {
    commandsStore: CommmandsStore;
}
