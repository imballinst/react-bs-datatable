import { getPageNumbers } from './pagination';

describe('getPageNumbers util (src/utils/getPageNumbers)', () => {
  test('getPageNumbers: fresh', () => {
    expect(
      getPageNumbers({ currentPageState: 1, maxPage: 5, paginationRange: 1 })
    ).toEqual([1]);

    expect(
      getPageNumbers({ currentPageState: 1, maxPage: 5, paginationRange: 3 })
    ).toEqual([1, 2, 3]);

    expect(
      getPageNumbers({ currentPageState: 1, maxPage: 5, paginationRange: 4 })
    ).toEqual([1, 2, 3, 4]);

    expect(
      getPageNumbers({ currentPageState: 1, maxPage: 3, paginationRange: 4 })
    ).toEqual([1, 2, 3]);
  });

  test('getPageNumbers: build from previous state: odd', () => {
    // [1, 2, 3]
    expect(
      getPageNumbers({
        currentPageState: 2,
        maxPage: 5,
        paginationRange: 3,
        prevPageNumbers: [1, 2, 3],
        prevPageState: 1
      })
    ).toEqual([1, 2, 3]);

    expect(
      getPageNumbers({
        currentPageState: 3,
        maxPage: 5,
        paginationRange: 3,
        prevPageNumbers: [1, 2, 3],
        prevPageState: 1
      })
    ).toEqual([2, 3, 4]);

    // [1, 2, 3, 4, 5]
    expect(
      getPageNumbers({
        currentPageState: 2,
        maxPage: 10,
        paginationRange: 5,
        prevPageNumbers: [1, 2, 3, 4, 5],
        prevPageState: 1
      })
    ).toEqual([1, 2, 3, 4, 5]);

    expect(
      getPageNumbers({
        currentPageState: 3,
        maxPage: 10,
        paginationRange: 5,
        prevPageNumbers: [1, 2, 3, 4, 5],
        prevPageState: 1
      })
    ).toEqual([1, 2, 3, 4, 5]);

    expect(
      getPageNumbers({
        currentPageState: 4,
        maxPage: 10,
        paginationRange: 5,
        prevPageNumbers: [1, 2, 3, 4, 5],
        prevPageState: 1
      })
    ).toEqual([2, 3, 4, 5, 6]);

    expect(
      getPageNumbers({
        currentPageState: 5,
        maxPage: 10,
        paginationRange: 5,
        prevPageNumbers: [1, 2, 3, 4, 5],
        prevPageState: 1
      })
    ).toEqual([3, 4, 5, 6, 7]);

    expect(
      getPageNumbers({
        currentPageState: 10,
        maxPage: 10,
        paginationRange: 5,
        prevPageNumbers: [1, 2, 3, 4, 5],
        prevPageState: 1
      })
    ).toEqual([6, 7, 8, 9, 10]);
  });

  test('getPageNumbers: build from previous state: even', () => {
    // [1, 2, 3, 4]
    expect(
      getPageNumbers({
        currentPageState: 2,
        maxPage: 5,
        paginationRange: 4,
        prevPageNumbers: [1, 2, 3, 4],
        prevPageState: 1
      })
    ).toEqual([1, 2, 3, 4]);

    expect(
      getPageNumbers({
        currentPageState: 3,
        maxPage: 5,
        paginationRange: 4,
        prevPageNumbers: [1, 2, 3, 4],
        prevPageState: 1
      })
    ).toEqual([1, 2, 3, 4]);

    // [1, 2, 3, 4, 5, 6]
    expect(
      getPageNumbers({
        currentPageState: 2,
        maxPage: 10,
        paginationRange: 6,
        prevPageNumbers: [1, 2, 3, 4, 5, 6],
        prevPageState: 1
      })
    ).toEqual([1, 2, 3, 4, 5, 6]);

    expect(
      getPageNumbers({
        currentPageState: 3,
        maxPage: 10,
        paginationRange: 6,
        prevPageNumbers: [1, 2, 3, 4, 5, 6],
        prevPageState: 1
      })
    ).toEqual([1, 2, 3, 4, 5, 6]);

    expect(
      getPageNumbers({
        currentPageState: 4,
        maxPage: 10,
        paginationRange: 6,
        prevPageNumbers: [1, 2, 3, 4, 5, 6],
        prevPageState: 1
      })
    ).toEqual([1, 2, 3, 4, 5, 6]);

    expect(
      getPageNumbers({
        currentPageState: 5,
        maxPage: 10,
        paginationRange: 6,
        prevPageNumbers: [1, 2, 3, 4, 5, 6],
        prevPageState: 1
      })
    ).toEqual([2, 3, 4, 5, 6, 7]);

    expect(
      getPageNumbers({
        currentPageState: 10,
        maxPage: 10,
        paginationRange: 6,
        prevPageNumbers: [1, 2, 3, 4, 5, 6],
        prevPageState: 1
      })
    ).toEqual([5, 6, 7, 8, 9, 10]);
  });
});
