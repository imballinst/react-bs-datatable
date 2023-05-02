/**
 * @internal
 *
 * This is a helper function to generate the page numbers.
 */
export function getPageNumbers({
  currentPageState,
  prevPageNumbers,
  paginationRange,
  maxPage
}: {
  currentPageState: number;
  prevPageNumbers?: number[];
  paginationRange: number;
  maxPage: number;
}) {
  const isEven = paginationRange % 2 === 0;
  let numberOfButtonsToEdges = Math.floor(paginationRange / 2);

  if (isEven) {
    // When it's even, then there should be 2 buttons in the center.
    numberOfButtonsToEdges -= 1;
  }

  if (prevPageNumbers && isEven) {
    const index = prevPageNumbers.indexOf(currentPageState);

    if (index >= 0) {
      const shiftRightIndexStart =
        prevPageNumbers.length - 1 - numberOfButtonsToEdges;

      if (index >= 0 && index < numberOfButtonsToEdges) {
        // Shift left.
        const numberOfShifts = index - numberOfButtonsToEdges;
        const startNumber = normalizeStartNumber(
          prevPageNumbers[0] + numberOfShifts
        );

        return getRange(startNumber, startNumber + paginationRange, maxPage);
      } else if (index >= shiftRightIndexStart && index < maxPage) {
        // Shift right.
        const numberOfShifts =
          numberOfButtonsToEdges - (paginationRange - index - 1);
        let startNumber = normalizeStartNumber(
          prevPageNumbers[0] + numberOfShifts
        );
        if (maxPage - startNumber + 1 < paginationRange) {
          startNumber = normalizeStartNumber(maxPage - paginationRange + 1);
        }

        return getRange(startNumber, startNumber + paginationRange, maxPage);
      } else {
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
    }
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
      startNumber = maxPage - paginationRange + 1;
    }
    // If somehow the start number is 0 or negative, we set it back to 1.
    if (startNumber < 1) startNumber = 1;
  }

  return getRange(startNumber, startNumber + paginationRange, maxPage);
}

function getRange(from: number, to: number, maxPage: number) {
  const pageNumbers: number[] = [];
  let i = from;

  while (i < to && i <= maxPage) {
    pageNumbers.push(i);
    i += 1;
  }

  return pageNumbers;
}

function normalizeStartNumber(val: number) {
  return val <= 0 ? 1 : val;
}
