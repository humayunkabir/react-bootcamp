const { useState, useEffect } = require('react');

const usePagination = (items, perPageItems) => {
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [currentPageItems, setCurrentPageItems] = useState(null);
  const [numberOfPages, setNumberOfPages] = useState(0);

  useEffect(() => {
    if (Array.isArray(items)) {
      setCurrentPageItems(items.slice(0, perPageItems));
      setNumberOfPages(Math.ceil(items.length / perPageItems));
    }
  }, [items, perPageItems]);

  // next button
  const goToNext = () => {
    goToPage(currentPageNumber + 1);
  };

  // perv button
  const goToPrev = () => {
    goToPage(currentPageNumber - 1);
  };

  // go to specific page
  const goToPage = (pageNumber) => {
    console.log({ pageNumber, numberOfPages });
    setCurrentPageNumber(pageNumber);
    setCurrentPageItems(
      items.slice(perPageItems * (pageNumber - 1), perPageItems * pageNumber)
    );
  };

  return {
    numberOfPages,
    currentPageItems,
    currentPageNumber,
    goToNext,
    goToPrev,
    goToPage,
  };
};

export default usePagination;
