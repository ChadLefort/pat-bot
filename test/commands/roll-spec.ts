import { Roll } from '../../src/models/commands/other/roll';
import * as chai from 'chai';
import 'mocha';

const expect = chai.expect;

describe('Roll', () => {
    let roll: Roll;

    beforeEach(() => {
        roll = Roll.getInstance();
    });

    it('should return some command details', () => {
        roll.getCommands().then(command => {
            expect(command.commandDetails.length).to.be.greaterThan(1);
            expect(command.commandDetails[0]).to.include({ command: 'roll' });
        });
    });
});
