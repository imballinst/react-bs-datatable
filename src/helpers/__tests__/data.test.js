import React from 'react';
import {
  getLastChildren,
  isPropFilterable,
  sortData,
  filterData,
  paginateData
} from '../data';

describe('data util (src/utils/data)', () => {
  it('should get last children of a react component; or that object if not', () => {
    const text = 'testDiv';
    const aComponent = <div>{text}</div>;

    expect(getLastChildren(aComponent)).toBe(text);
    expect(getLastChildren(text)).toBe(text);
  });

  it('should determine whether a prop is filterable or not from tableHeader', () => {
    const tableHeader = [
      { prop: 'prop1', filterable: true },
      { prop: 'prop2', filterable: false }
    ];

    expect(isPropFilterable(tableHeader, 'prop1')).toBe(true);
    expect(isPropFilterable(tableHeader, 'prop2')).toBe(false);
  });

  it('should sort data correctly', () => {
    const firstData = { prop1: 1 };
    const secondData = { prop1: 2 };
    const data = [firstData, secondData];

    const sortedPropFirst = { prop: 'prop1', isAscending: true };
    const sortedPropSecond = { prop: 'prop1', isAscending: false };

    const sortFirstData = sortData(data, sortedPropFirst, undefined);
    const sortSecondData = sortData(data, sortedPropSecond, undefined);

    expect(sortFirstData[0]).toBe(firstData);
    expect(sortFirstData[1]).toBe(secondData);

    expect(sortSecondData[0]).toBe(secondData);
    expect(sortSecondData[1]).toBe(firstData);
  });

  it('should filter data correctly', () => {
    // Initialization
    const tableHeader = [
      { prop: 'prop1', filterable: true },
      { prop: 'prop2', filterable: false }
    ];
    const firstData = { prop1: 1 };
    const secondData = { prop1: 2 };
    const data = [firstData, secondData];

    // Without filter function
    let filteredTextFirst = '1';
    let filteredTextSecond = '2';

    let filterFirstData = filterData(
      data,
      tableHeader,
      filteredTextFirst,
      undefined
    );
    let filterSecondData = filterData(
      data,
      tableHeader,
      filteredTextSecond,
      undefined
    );

    expect(filterFirstData[0]).toBe(firstData);
    expect(filterSecondData[0]).toBe(secondData);

    // With filter function
    const filterFunction = { prop1: val => (val === 1 ? 'hehehe' : 'hahaha') };

    filteredTextFirst = 'hehehe';
    filteredTextSecond = 'hahaha';

    filterFirstData = filterData(
      data,
      tableHeader,
      filteredTextFirst,
      filterFunction
    );
    filterSecondData = filterData(
      data,
      tableHeader,
      filteredTextSecond,
      filterFunction
    );

    expect(filterFirstData[0]).toBe(firstData);
    expect(filterSecondData[0]).toBe(secondData);
  });

  it('should paginate data correctly', () => {
    const tableData = Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], val => {
      const objectedNum = { propNum: val };

      return objectedNum;
    });

    const showFiveData = paginateData(tableData, 1, 5);
    const showSixData = paginateData(tableData, 1, 6);

    const showFiveDataPageTwo = paginateData(tableData, 2, 5);
    const showSixDataPageTwo = paginateData(tableData, 2, 6);

    expect(showFiveData.length).toBe(5);
    expect(showSixData.length).toBe(6);
    expect(showFiveData[4]).toEqual({ propNum: 5 });
    expect(showSixData[5]).toEqual({ propNum: 6 });

    expect(showFiveDataPageTwo.length).toBe(5);
    expect(showSixDataPageTwo.length).toBe(4);
    expect(showFiveDataPageTwo[0]).toEqual({ propNum: 6 });
    expect(showSixDataPageTwo[0]).toEqual({ propNum: 7 });
  });
});
