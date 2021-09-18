import { useState, useContext, useEffect } from 'react';
import Table from './components/Table';
import { Context } from '../src/context';
import usePagination from './hooks/usePagination';

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

const App = () => {
  const [search, setSearch] = useState('');
  const { users, fetching, handleSearch, handleSort } = useContext(Context);
  const { currentPageItems, numberOfPages, goToPage } = usePagination(users, 3);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(search);
  };

  // useEffect(() => {
  //   handleSearch(search);
  // }, [handleSearch, search]);

  return (
    <main>
      <div className="container">
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
                {Array(numberOfPages)
                  .fill(0)
                  .map((item, index) => (
                    <button
                      className="btn btn-success"
                      key={index}
                      onClick={() => goToPage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}
              </>
            ) : (
              <div className="alert alert-info">No users found!</div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default App;
