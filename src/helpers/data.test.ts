import { sortData, filterData, paginateData } from './data';
import { convertArrayToRecord } from './object';
import { ColumnValueProcessor, TableColumnType } from './types';

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

  it('should sort data correctly: with column value processor', () => {
    const firstData = { name: 'hello world' };
    const secondData = { name: 'Hello World' };
    const data = [firstData, secondData];

    const sortedPropFirst = { prop: 'name', order: 'asc' } as const;
    const sortedPropSecond = { prop: 'name', order: 'desc' } as const;

    let sortFirstData = sortData(data, sortedPropFirst, undefined);
    let sortSecondData = sortData(data, sortedPropSecond, undefined);

    // A-Z comes before a-z, so the order should be the other way around.
    expect(sortFirstData[0]).toBe(secondData);
    expect(sortFirstData[1]).toBe(firstData);

    // This is the counterpart.
    expect(sortSecondData[0]).toBe(firstData);
    expect(sortSecondData[1]).toBe(secondData);

    // Now, we try usnig the column value processor to "normalize" the text to be all lowercase. The order should stay the same.
    const columnValueProcessorObject: ColumnValueProcessor<typeof firstData> = {
      name: (val) => val.toLowerCase()
    };

    sortFirstData = sortData(data, sortedPropFirst, columnValueProcessorObject);
    sortSecondData = sortData(
      data,
      sortedPropSecond,
      columnValueProcessorObject
    );

    expect(sortFirstData[0]).toBe(firstData);
    expect(sortFirstData[1]).toBe(secondData);

    expect(sortSecondData[0]).toBe(firstData);
    expect(sortSecondData[1]).toBe(secondData);

    // Now, try using the function form.
    const columnValueProcessorFn: ColumnValueProcessor<typeof firstData> = (
      key,
      row
    ) => {
      return row[key].toLowerCase();
    };

    sortFirstData = sortData(data, sortedPropFirst, columnValueProcessorFn);
    sortSecondData = sortData(data, sortedPropSecond, columnValueProcessorFn);

    expect(sortFirstData[0]).toBe(firstData);
    expect(sortFirstData[1]).toBe(secondData);

    expect(sortSecondData[0]).toBe(firstData);
    expect(sortSecondData[1]).toBe(secondData);
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
