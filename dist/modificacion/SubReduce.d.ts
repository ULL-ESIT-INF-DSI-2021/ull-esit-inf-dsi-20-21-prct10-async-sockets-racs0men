import { Reduce } from "./reduce";
/**
 * Clase SubReduce
 */
export declare class SubReduce extends Reduce {
    protected arrayReduce: number[];
    constructor(arrayReduce: number[]);
    /**
     * Método operation para la resta
     * @return La suma del array
     */
    protected operation(): number;
}
