import { Constructor } from '@cratis/fundamentals';
import { Suite } from 'mocha';

/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

export type ContextForSuite<TContext extends {}> = (this: Suite, context: TContext) => void;

export function given<TContext extends {}>(contextType: Constructor<TContext>, callback: ContextForSuite<TContext>) {
    return function (this: Suite) {
        const context = new contextType(this);
        callback.call(this, context);
    };
}
