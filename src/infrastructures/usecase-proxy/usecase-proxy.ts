export class UseCaseProxy<T> {
  constructor(private useCase: T) {}

  getInstance(): T {
    return this.useCase;
  }
}
