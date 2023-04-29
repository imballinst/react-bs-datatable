export function getPageNumbers({
  currentPageState,
  prevPageState,
  prevPageNumbers,
  paginationRange,
  maxPage
}: {
  currentPageState: number;
  prevPageState?: number;
  prevPageNumbers?: number[];
  paginationRange: number;
  maxPage: number;
}) {
  const numberOfButtonsToEdges = Math.floor(paginationRange / 2);
  const isEven = paginationRange % 2 === 0;

  if (
    (prevPageState && !prevPageNumbers) ||
    (!prevPageState && prevPageNumbers)
  ) {
    throw new Error(
      'When passing either `prevPageState` or `prevPageNumbers` to `getPageNumbers`, both values should exist'
    );
  }

  if (prevPageState && prevPageNumbers && isEven) {
    const index = prevPageNumbers.indexOf(prevPageState);
    const isCurrentPageStateLocatedAtMiddleButtonGroupInPreviousState =
      index > numberOfButtonsToEdges &&
      index < paginationRange - numberOfButtonsToEdges;
    const isCurrentPageWithinRangeOfMinOrMaxPage =
      currentPageState <= paginationRange ||
      currentPageState >= maxPage - paginationRange;

    if (
      isCurrentPageStateLocatedAtMiddleButtonGroupInPreviousState ||
      isCurrentPageWithinRangeOfMinOrMaxPage
    ) {
      // For example, from this:
      // 4, 5, [6], 7, 8, 9
      //
      // to this:
      // 4, 5, 6, [7], 8, 9
      //
      // In that case, we don't need to "create" a new page numbers. Just reuse the old one.
      // Another example:
      //
      // 1, 2, [3], 4, 5, 6 --> 1, [2], 3, 4, 5, 6
      // 5, 6, 7, [8], 9, 10 --> 5, 6, 7, 8, [9], 10 (assuming 10 is the maxPage)
      return prevPageNumbers;
    }

    // Otherwise, create a new one.
    const isCurrentPageStateBigger = currentPageState > prevPageState;
    // If the next clicked page is "bigger" than the previous one, ensure it's located at the right-side of the middle parts.
    // Otherwise, it should be located at the left-side of the middle parts.
    if (isCurrentPageStateBigger) {
      return [
        ...getNumbers(
          currentPageState - numberOfButtonsToEdges - 1,
          currentPageState
        ),
        currentPageState,
        ...getNumbers(
          currentPageState + 1,
          currentPageState + numberOfButtonsToEdges
        )
      ];
    }

    return [
      ...getNumbers(
        currentPageState - numberOfButtonsToEdges,
        currentPageState
      ),
      currentPageState,
      ...getNumbers(
        currentPageState + 1,
        currentPageState + numberOfButtonsToEdges + 1
      )
    ];
  }

  // Build fresh.
  let startNumber: number;

  if (currentPageState === 1) {
    // Active button is the first one.
    startNumber = 1;
  } else if (currentPageState === maxPage && maxPage !== 1) {
    // Active button is in the last.
    startNumber =
      maxPage - paginationRange + 1 > 0
        ? currentPageState - paginationRange + 1
        : 1;
  } else {
    // Active button is in the middle.
    startNumber = currentPageState - numberOfButtonsToEdges;

    // If max page is "around the corner", then we need to make the max page to be in the last button.
    if (startNumber + paginationRange > maxPage) {
      startNumber = maxPage - paginationRange;
    }
    // If somehow the start number is 0 or negative, we set it back to 1.
    if (startNumber < 1) startNumber = 1;
  }

  const pageNumbers: number[] = [];
  let i = 0;

  while (i < paginationRange && startNumber <= maxPage) {
    pageNumbers.push(startNumber);
    // Increment all.
    i += 1;
    startNumber += 1;
  }

  return pageNumbers;
}

function getNumbers(from: number, to: number) {
  const numbers: number[] = [];
  for (let i = from; i < to; i++) {
    numbers.push(i);
  }
  return numbers;
}
