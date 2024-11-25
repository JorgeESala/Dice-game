import crypto from 'node:crypto';
import { FairNumber } from './FairNumber.js';

export class FairNumberGenerator{

    static generateNumber(min,max){
        const number = crypto.randomInt(min, max + 1); // uniformly distributed random int
        const key = crypto.randomBytes(32).toString('hex');
        const hmac = crypto.createHmac('sha3-256', key).update(number.toString()).digest("hex");
        return new FairNumber(number, key, hmac);
    }
}