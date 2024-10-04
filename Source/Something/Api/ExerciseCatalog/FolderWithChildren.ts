/*---------------------------------------------------------------------------------------------
 *  **DO NOT EDIT** - This file is an automatically generated file.
 *--------------------------------------------------------------------------------------------*/

/* eslint-disable sort-imports */
// eslint-disable-next-line header/header
import { Guid } from '@cratis/fundamentals';
import { ExerciseInFolder } from './ExerciseInFolder';

export class FolderWithChildren {
    id!: Guid;
    parentFolderId!: Guid;
    name!: string;
    subFolders!: FolderWithChildren[];
    exercises!: ExerciseInFolder[];
}
