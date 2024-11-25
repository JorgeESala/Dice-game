import {Dice} from './Dice.js';
export class InputParser{

    static inputToDiceArray(arrayInput){
        
        if(arrayInput.length < 3 ){
            throw new Error("You need to input at least 3 dices");
        }else {
            return this.createDiceArray(arrayInput);
        }
        
    }

    static createDiceArray(diceValues){
        return diceValues.map(value => new Dice(value));
    }
    
}
