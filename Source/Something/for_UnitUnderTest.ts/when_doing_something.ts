import { LocalThing } from './LocalThing';
import { given } from '@shared/testing';
import { a_unit_under_test } from './given/a_unit_under_test';

describe('when doing something', given(a_unit_under_test, (context) => {
    const localThing = new LocalThing();
    console.log('context', context);
    console.log('localThing', localThing);
    it('should do something', () => true.should.be.true);
}));
