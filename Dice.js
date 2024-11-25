export class Dice {
    constructor(values){
        this.sides = values.split(",").map(Number).filter((n) => !isNaN(n));

        if(this.sides.length !==  6){
            throw new Error(`invalid dice (${values}), all dices needs 6 numbers sepparated by a comma
For example: node task3.js 1,2,3,4,5,6 9,8,7,6,5,4 1,1,1,6,6,6
                `);
        }
    }
    
    getSides(){
        return this.sides;
    }
    roll(number){
        return this.sides[number];
    }
}