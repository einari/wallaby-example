import { Guid } from '@cratis/fundamentals';

export class a_unit_under_test {
    constructor() {
        this.someIdentifier = Guid.create();
    }

    someIdentifier: Guid;
}
