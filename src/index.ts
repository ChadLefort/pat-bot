import Config from './models/config';
import PatBot from './models/pat-bot';

let patBot = new PatBot(Config.getInstance().token);

patBot.execute();

// import * as Interface from './interfaces';
// import Commands from './models/commands';
// import Config from './models/config';
// import InstanceLoader from './models/instance-loader';
// import * as _ from 'lodash';

// let config = new Config();
// let commandDetails: Array<any> = [];

// Commands.getInstance().getMainCommands('', config.logger())
//     .then(commands => {
//         _.forEach(commands, file => {
//             let command = file.split('-');
//             let formatted = _.chain(command).map((value: string) => _.capitalize(value)).join('').value();

//             commandDetails.push(InstanceLoader.createInstance<Interface.ICommand>(formatted).getCommandDetails([]));
//         });

//         console.log(commandDetails);
//     });
