import clsx from 'clsx';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../context';
import usePagination from '../hooks/usePagination';
import useQuery from '../hooks/useQuery';
import Table from './Table';

const headers = [
  {
    name: 'name',
    sort: 'asc',
  },
  {
    name: 'username',
    sort: 'asc',
  },
  {
    name: 'email',
  },
  {
    name: 'phone',
  },
  {
    name: 'website',
  },
];

const formatters = {
  email: (email) => <a href={`mailto:${email}`}>{email}</a>,
  website: (url) => (
    <a className="text-danger" href={url} target="_blank" rel="noreferrer">
      {url}
    </a>
  ),
};

const Users = () => {
  const [search, setSearch] = useState('');
  const { users, fetching, handleSearch, handleSort } = useContext(Context);
  const {
    currentPageItems,
    currentPageNumber,
    numberOfPages,
    goToPage,
    goToPrev,
    goToNext,
  } = usePagination(users, 3);

  const history = useHistory();
  const query = useQuery();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(search);
  };

  const handleGoToPage = (index) => {
    goToPage(index + 1);
    history.push({
      search: `?currentPageNumber=${index + 1}`,
    });
  };

  useEffect(() => {
    handleSearch(search);
  }, [handleSearch, search]);

  useEffect(() => {
    if (users?.length) {
      goToPage(Number(query.get('currentPageNumber')));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  return (
    <div className="row">
      <div className="col">
        {/* <button
              className="btn btn-success"
              onClick={(e) => handleSort(e, 'name', 'asc')}
            >
              Sort asc
            </button>
            <button
              className="btn btn-success"
              onClick={(e) => handleSort(e, 'name', 'desc')}
            >
              Sort desc
            </button> */}

        {fetching ? (
          <div className="alert alert-info">Fetching...</div>
        ) : Array.isArray(users) ? (
          <>
            <form className="d-flex mb-3 mt-4" onSubmit={handleSubmit}>
              <input
                type="text"
                className="form-control"
                value={search}
                placeholder="Search"
                onChange={({ target: { value } }) => setSearch(value)}
              />
              <button className="btn btn-primary" type="search">
                Search
              </button>
            </form>
            <Table
              data={currentPageItems}
              headers={headers}
              onSort={handleSort}
              formatters={formatters}
            />
            <nav aria-label="pagination">
              <ul className="pagination">
                <li
                  className={clsx('page-item', {
                    disabled: currentPageNumber === 1,
                  })}
                >
                  <button className="page-link" onClick={goToPrev}>
                    Prev
                  </button>
                </li>
                {Array(numberOfPages)
                  .fill(0)
                  .map((item, index) => (
                    <li
                      className={clsx('page-item', {
                        active: currentPageNumber === index + 1,
                      })}
                      key={index}
                    >
                      <button
                        className="page-link"
                        onClick={() => handleGoToPage(index)}
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}
                <li
                  className={clsx('page-item', {
                    disabled: currentPageNumber === numberOfPages,
                  })}
                >
                  <button className="page-link" onClick={goToNext}>
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </>
        ) : (
          <div className="alert alert-info">No users found!</div>
        )}
      </div>
    </div>
  );
};

export default Users;
