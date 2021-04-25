import { Reduce } from "./reduce";
/**
 * Clase AddReduce
 */
export declare class AddReduce extends Reduce {
    protected arrayReduce: number[];
    constructor(arrayReduce: number[]);
    /**
     * Método operation para la suma
     * @return La suma del array
     */
    protected operation(): number;
}
