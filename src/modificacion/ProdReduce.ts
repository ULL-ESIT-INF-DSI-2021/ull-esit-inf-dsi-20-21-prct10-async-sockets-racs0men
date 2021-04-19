import { Reduce } from "./reduce";

/**
 * Clase SubReduce
 */
export class ProdReduce extends Reduce {
  constructor(protected arrayReduce: number[]) {
    super(arrayReduce);
  }

  /**
   * Método operation para la multiplicación
   * @return La suma del array
   */
  public operation(): number {
    let total = 0;
    for(let i in this.arrayReduce) {
      total *= this.arrayReduce[i];
    }
    return total;
  }
}

let multi: ProdReduce = new ProdReduce([3,4,5]);

console.log(multi.operation());
