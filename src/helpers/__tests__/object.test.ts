import { customJoin } from '../object';

describe('object util', () => {
  it('should correctly join with custmo separator', () => {
    const strings = ['a', 'b', 'c'];

    const expected = 'a, b, c';
    const expected2 = 'a, b, and c';

    expect(customJoin(strings, ', ')).toBe(expected);
    expect(customJoin(strings, ', ', 'and ')).toBe(expected2);
  });
});
