export class FairNumber {
    constructor(number, key, hmac){
        this.number = number;
        this.key = key;
        this.hmac = hmac;
    }
    getNumber(){
        return this.number;
    }
    getKey(){
        return this.key;
    }
    getHmac(){
        return this.hmac;
    }
}