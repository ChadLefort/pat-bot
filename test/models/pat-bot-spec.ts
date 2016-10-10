import Config from '../../src/models/config';
import PatBot from '../../src/models/pat-bot';
import * as chai from 'chai';
import 'mocha';

const expect = chai.expect;

describe('PatBot', () => {
    let patBot: PatBot;

    beforeEach(() => {
        patBot = new PatBot(Config.getInstance().token);
    });

    it('should create a pat bot', () => {
        expect(patBot).to.be.instanceof(Object);
    });
});
