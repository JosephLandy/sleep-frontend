import {range} from './utils';

describe('range', () => {
    it('outputs range between a and b', () => {
        let a = 9, b = 12;
        expect(range(a, b)).toEqual([9, 10, 11]);
    });
});