"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var object_1 = require("../object");
describe('object util', function () {
    it('should correctly join with custmo separator', function () {
        var strings = ['a', 'b', 'c'];
        var expected = 'a, b, c';
        var expected2 = 'a, b, and c';
        expect(object_1.customJoin(strings, ', ')).toBe(expected);
        expect(object_1.customJoin(strings, ', ', 'and ')).toBe(expected2);
    });
});
//# sourceMappingURL=object.test.js.map