
/**
 * Clase Reduce
 */
export abstract class Reduce {
  constructor(protected arrayReduce: number[]) {}

  /**
   * Template method that defines the skeleton of an Reduce Algorithm.
   */
  public run() {
    this.beforeOperation();
    this.operation();
    this.afterOperation();
  }

  /**
   * Operations that must be implemented by subclasses
   */
  protected abstract operation(): void;

  /**
   * Empty operations that could be implemented by subclasses (not
   * mandatory)
   */
  protected afterOperation() {}
  protected beforeOperation() {}
}