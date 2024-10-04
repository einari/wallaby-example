import { Guid } from '@cratis/fundamentals';
import { FolderWithChildren } from './Api/ExerciseCatalog/FolderWithChildren';

export class UnitUnderTest {
    constructor() {
        this.someIdentifier = Guid.create();
        this.folder = new FolderWithChildren();
    }

    someIdentifier: Guid;
    folder: FolderWithChildren;
}
