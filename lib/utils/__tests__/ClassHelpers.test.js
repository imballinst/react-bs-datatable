"use strict";

var _react = _interopRequireDefault(require("react"));

var _ClassHelpers = require("../ClassHelpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('ClassHelpers util (src/utils/ClassHelpers)', function () {
  it('should get last children of a react component; or that object if not', function () {
    var text = 'testDiv';

    var aComponent = _react.default.createElement("div", null, text);

    expect((0, _ClassHelpers.getLastChildren)(aComponent)).toBe(text);
    expect((0, _ClassHelpers.getLastChildren)(text)).toBe(text);
  });
  it('should determine whether a prop is filterable or not from tableHeader', function () {
    var tableHeader = [{
      prop: 'prop1',
      filterable: true
    }, {
      prop: 'prop2',
      filterable: false
    }];
    expect((0, _ClassHelpers.isPropFilterable)(tableHeader, 'prop1')).toBe(true);
    expect((0, _ClassHelpers.isPropFilterable)(tableHeader, 'prop2')).toBe(false);
  });
  it('should sort data correctly', function () {
    var firstData = {
      prop1: 1
    };
    var secondData = {
      prop1: 2
    };
    var data = [firstData, secondData];
    var sortedPropFirst = {
      prop: 'prop1',
      isAscending: true
    };
    var sortedPropSecond = {
      prop: 'prop1',
      isAscending: false
    };
    var sortFirstData = (0, _ClassHelpers.sortData)(sortedPropFirst, undefined, data);
    var sortSecondData = (0, _ClassHelpers.sortData)(sortedPropSecond, undefined, data);
    expect(sortFirstData[0]).toBe(firstData);
    expect(sortFirstData[1]).toBe(secondData);
    expect(sortSecondData[0]).toBe(secondData);
    expect(sortSecondData[1]).toBe(firstData);
  });
  it('should filter data correctly', function () {
    // Initialization
    var tableHeader = [{
      prop: 'prop1',
      filterable: true
    }, {
      prop: 'prop2',
      filterable: false
    }];
    var firstData = {
      prop1: 1
    };
    var secondData = {
      prop1: 2
    };
    var data = [firstData, secondData]; // Without filter function

    var filteredTextFirst = '1';
    var filteredTextSecond = '2';
    var filterFirstData = (0, _ClassHelpers.filterData)(tableHeader, filteredTextFirst, undefined, data);
    var filterSecondData = (0, _ClassHelpers.filterData)(tableHeader, filteredTextSecond, undefined, data);
    expect(filterFirstData[0]).toBe(firstData);
    expect(filterSecondData[0]).toBe(secondData); // With filter function

    var filterFunction = {
      prop1: function prop1(val) {
        return val === 1 ? 'hehehe' : 'hahaha';
      }
    };
    filteredTextFirst = 'hehehe';
    filteredTextSecond = 'hahaha';
    filterFirstData = (0, _ClassHelpers.filterData)(tableHeader, filteredTextFirst, filterFunction, data);
    filterSecondData = (0, _ClassHelpers.filterData)(tableHeader, filteredTextSecond, filterFunction, data);
    expect(filterFirstData[0]).toBe(firstData);
    expect(filterSecondData[0]).toBe(secondData);
  });
  it('should paginate data correctly', function () {
    var tableData = Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], function (val) {
      var objectedNum = {
        propNum: val
      };
      return objectedNum;
    });
    var showFiveData = (0, _ClassHelpers.paginateData)(5, 1, tableData);
    var showSixData = (0, _ClassHelpers.paginateData)(6, 1, tableData);
    var showFiveDataPageTwo = (0, _ClassHelpers.paginateData)(5, 2, tableData);
    var showSixDataPageTwo = (0, _ClassHelpers.paginateData)(6, 2, tableData);
    expect(showFiveData.length).toBe(5);
    expect(showSixData.length).toBe(6);
    expect(showFiveData[4]).toEqual({
      propNum: 5
    });
    expect(showSixData[5]).toEqual({
      propNum: 6
    });
    expect(showFiveDataPageTwo.length).toBe(5);
    expect(showSixDataPageTwo.length).toBe(4);
    expect(showFiveDataPageTwo[0]).toEqual({
      propNum: 6
    });
    expect(showSixDataPageTwo[0]).toEqual({
      propNum: 7
    });
  });
});