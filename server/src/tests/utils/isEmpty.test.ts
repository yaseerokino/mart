import { isEmpty } from '../../utils';

describe('isEmpty Util', () => {
  it(`It's empty`, () => {
    ['', {}, undefined, null].map((value) => expect(isEmpty(value as any)).toEqual(true));
  });

  it(`It's not empty`, () => {
    ['one', 1, { one: 1 }].map((value) => expect(isEmpty(value)).toEqual(false));
  });
});
