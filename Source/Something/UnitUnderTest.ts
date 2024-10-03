import { Guid } from '@cratis/fundamentals';

export class UnitUnderTest {
    constructor() {
        this.someIdentifier = Guid.create();
    }

    someIdentifier: Guid;
}
