import PatBot from '../../../src/bot/pat-bot';
import Config from '../../../src/config';
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
