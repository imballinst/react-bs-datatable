"use strict";

var _react = _interopRequireDefault(require("react"));

var _data = require("../data");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('data util (src/utils/data)', function () {
  it('should get last children of a react component; or that object if not', function () {
    var text = 'testDiv';

    var aComponent = _react["default"].createElement("div", null, text);

    expect((0, _data.getLastChildren)(aComponent)).toBe(text);
    expect((0, _data.getLastChildren)(text)).toBe(text);
  });
  it('should determine whether a prop is filterable or not from tableHeader', function () {
    var tableHeader = [{
      prop: 'prop1',
      filterable: true
    }, {
      prop: 'prop2',
      filterable: false
    }];
    expect((0, _data.isPropFilterable)(tableHeader, 'prop1')).toBe(true);
    expect((0, _data.isPropFilterable)(tableHeader, 'prop2')).toBe(false);
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
    var sortFirstData = (0, _data.sortData)(data, sortedPropFirst, undefined);
    var sortSecondData = (0, _data.sortData)(data, sortedPropSecond, undefined);
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
    var filterFirstData = (0, _data.filterData)(data, tableHeader, filteredTextFirst, undefined);
    var filterSecondData = (0, _data.filterData)(data, tableHeader, filteredTextSecond, undefined);
    expect(filterFirstData[0]).toBe(firstData);
    expect(filterSecondData[0]).toBe(secondData); // With filter function

    var filterFunction = {
      prop1: function prop1(val) {
        return val === 1 ? 'hehehe' : 'hahaha';
      }
    };
    filteredTextFirst = 'hehehe';
    filteredTextSecond = 'hahaha';
    filterFirstData = (0, _data.filterData)(data, tableHeader, filteredTextFirst, filterFunction);
    filterSecondData = (0, _data.filterData)(data, tableHeader, filteredTextSecond, filterFunction);
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
    var showFiveData = (0, _data.paginateData)(tableData, 1, 5);
    var showSixData = (0, _data.paginateData)(tableData, 1, 6);
    var showFiveDataPageTwo = (0, _data.paginateData)(tableData, 2, 5);
    var showSixDataPageTwo = (0, _data.paginateData)(tableData, 2, 6);
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