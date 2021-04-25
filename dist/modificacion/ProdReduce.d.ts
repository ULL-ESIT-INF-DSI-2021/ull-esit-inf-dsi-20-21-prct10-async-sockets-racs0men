import { Reduce } from "./reduce";
/**
 * Clase SubReduce
 */
export declare class ProdReduce extends Reduce {
    protected arrayReduce: number[];
    constructor(arrayReduce: number[]);
    /**
     * Método operation para la multiplicación
     * @return La suma del array
     */
    operation(): number;
}
