/**
 * Clase Reduce
 */
export declare abstract class Reduce {
    protected arrayReduce: number[];
    constructor(arrayReduce: number[]);
    /**
     * Template method that defines the skeleton of an Reduce Algorithm.
     */
    run(): void;
    /**
     * Operations that must be implemented by subclasses
     */
    protected abstract operation(): void;
    /**
     * Empty operations that could be implemented by subclasses (not
     * mandatory)
     */
    protected afterOperation(): void;
    protected beforeOperation(): void;
}
