const { useState, useEffect } = require('react');

const usePagination = (items, perPageItems) => {
  console.log(items, perPageItems);
  const [currentPageItems, setCurrentPageItems] = useState(null);
  const [numberOfPages, setNumberOfPages] = useState(0);

  useEffect(() => {
    if (Array.isArray(items)) {
      setCurrentPageItems(items.slice(0, perPageItems));
      setNumberOfPages(Math.ceil(items.length / perPageItems));
    }
  }, [items, perPageItems]);

  // next button
  const goToNext = (currentPage) => {
    console.log({ currentPage, numberOfPages });
  };

  // perv button
  const goToPrev = (currentPage) => {
    console.log({ currentPage, numberOfPages });
  };

  // go to specific page
  const goToPage = (pageNumber) => {
    console.log({ pageNumber, numberOfPages });
    setCurrentPageItems(
      items.slice(perPageItems * (pageNumber - 1), perPageItems * pageNumber)
    );
  };

  return {
    numberOfPages,
    currentPageItems,
    goToNext,
    goToPrev,
    goToPage,
  };
};

export default usePagination;
