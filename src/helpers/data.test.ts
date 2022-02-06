import { sortData, filterData, paginateData } from './data';
import { convertArrayToRecord } from './object';
import { ColumnProcessObj, TableColumnType } from './types';

interface TestObject {
  prop1: number;
  prop2: number;
}

describe('data util (src/utils/data)', () => {
  it('should sort data correctly', () => {
    const firstData = { prop1: 1 };
    const secondData = { prop1: 2 };
    const data = [firstData, secondData];

    const sortedPropFirst = { prop: 'prop1', order: 'asc' } as const;
    const sortedPropSecond = { prop: 'prop1', order: 'desc' } as const;

    const sortFirstData = sortData(data, sortedPropFirst, undefined);
    const sortSecondData = sortData(data, sortedPropSecond, undefined);

    expect(sortFirstData[0]).toBe(firstData);
    expect(sortFirstData[1]).toBe(secondData);

    expect(sortSecondData[0]).toBe(secondData);
    expect(sortSecondData[1]).toBe(firstData);
  });

  it('should filter data correctly', () => {
    // Initialization
    const headers: TableColumnType<TestObject>[] = [
      { prop: 'prop1', isFilterable: true },
      { prop: 'prop2', isFilterable: false }
    ];
    const headersDictionary = convertArrayToRecord(headers, 'prop');

    const firstData = { prop1: 1, prop2: 123 };
    const secondData = { prop1: 2, prop2: 123 };
    const data = [firstData, secondData];

    let filteredTextFirst = '1';
    let filteredTextSecond = '2';

    let filterFirstData = filterData(
      data,
      headersDictionary,
      filteredTextFirst
    );
    let filterSecondData = filterData(
      data,
      headersDictionary,
      filteredTextSecond
    );

    expect(filterFirstData[0]).toBe(firstData);
    expect(filterSecondData[0]).toBe(secondData);
  });

  it('should paginate data correctly', () => {
    const tableData = Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], (val) => {
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
