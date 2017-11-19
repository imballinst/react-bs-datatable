import React from 'react';

import {
  getLastChildren,
  isPropFilterable,
  sortData,
  filterData,
  paginateData,
} from '../ClassHelpers';

describe('ClassHelpers util (src/utils/ClassHelpers)', () => {
  it('should get last children of a react component; or that object if not', () => {
    const text = 'testDiv';
    const aComponent = (<div>{text}</div>);

    expect(getLastChildren(aComponent)).toBe(text);
    expect(getLastChildren(text)).toBe(text);
  });

  it('should determine whether a prop is filterable or not from tableHeader', () => {
    const tableHeader = [
      { prop: 'prop1', filterable: true },
      { prop: 'prop2', filterable: false },
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

    const sortFirstData = sortData(sortedPropFirst, undefined, data);
    const sortSecondData = sortData(sortedPropSecond, undefined, data);

    expect(sortFirstData[0]).toBe(firstData);
    expect(sortFirstData[1]).toBe(secondData);

    expect(sortSecondData[0]).toBe(secondData);
    expect(sortSecondData[1]).toBe(firstData);
  });

  it('should filter data correctly', () => {
    const tableHeader = [
      { prop: 'prop1', filterable: true },
      { prop: 'prop2', filterable: false },
    ];

    const firstData = { prop1: 1 };
    const secondData = { prop1: 2 };
    const data = [firstData, secondData];

    const filteredTextFirst = '1';
    const filteredTextSecond = '2';

    const sortFirstData = filterData(tableHeader, filteredTextFirst, data);
    const sortSecondData = filterData(tableHeader, filteredTextSecond, data);

    expect(sortFirstData[0]).toBe(firstData);

    expect(sortSecondData[0]).toBe(secondData);
  });

  it('should paginate data correctly', () => {
    const tableData = Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], (val) => {
      const objectedNum = { propNum: val };

      return objectedNum;
    });

    const showFiveData = paginateData(5, 1, tableData);
    const showSixData = paginateData(6, 1, tableData);

    const showFiveDataPageTwo = paginateData(5, 2, tableData);
    const showSixDataPageTwo = paginateData(6, 2, tableData);

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
