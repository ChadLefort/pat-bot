import { Roll } from '../../src/models/commands/roll';
import * as chai from 'chai';
import 'mocha';

const expect = chai.expect;

describe('Roll', () => {
    let roll: Roll;

    beforeEach(() => {
        roll = Roll.getInstance();
    });

    it('should return some command details', () => {
        let commandDetails = roll.getCommandDetails();
        expect(commandDetails.length).to.be.greaterThan(1);
        expect(commandDetails[0]).to.include({ command: 'roll' });
    });
});
