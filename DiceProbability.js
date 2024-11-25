// Get the probability to beat a dice 
export class DiceProbability {
    SIDES = 6;
    static ProbabilityOfWinning(dice1, dice2){
        let counter = 0;
        let sides1 = dice1.getSides();
        let sides2 = dice2.getSides();
        for(let i=0; i< sides1.length; i++ ){
            for(let j=0; j< sides2.length; j++){
                if(sides1[i] > sides2[j]){
                    counter++;
                }
            }
        }
        return counter / 36;
    
    }
}