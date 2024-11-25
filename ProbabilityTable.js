import AsciiTable from "ascii-table/ascii-table.js";
import { DiceProbability } from "./DiceProbability.js";

export class ProbabilityTable{
  constructor(diceArray){
    this.table = new AsciiTable('Probability of winning');
    this.table.setHeading('Your dice \u2193', ...diceArray.map(element => element.getSides()));
    
    // Writes all the rows on the table
    for(let i=0; i<diceArray.length; i++){
      let allProbabilities = (diceArray.map(dice => DiceProbability.ProbabilityOfWinning(diceArray[i], dice)));
      this.table.addRow(diceArray[i].getSides(),...allProbabilities);
    }
    
  }
  
  print(){
    console.log(this.table.toString());
  }
}
