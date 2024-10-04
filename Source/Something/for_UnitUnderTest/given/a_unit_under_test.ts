import { Guid } from '@cratis/fundamentals';
import { UnitUnderTest } from '../../UnitUnderTest';
import { FolderWithChildren } from 'Api/ExerciseCatalog';

export class a_unit_under_test {
    constructor() {
        this.someIdentifier = Guid.create();
        this.unit = new UnitUnderTest();
        this.folder = new FolderWithChildren();
    }

    someIdentifier: Guid;
    unit: UnitUnderTest;
    folder: FolderWithChildren;
}
