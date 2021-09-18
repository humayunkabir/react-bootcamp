import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const Context = createContext();

const AppContext = ({ children }) => {
  const [fetchedUsers, setFetchedUsers] = useState(null);
  const [users, setUsers] = useState(null);
  const [fetching, setIsFetching] = useState(true);

  const fetchUsers = () => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        setFetchedUsers(response.data);
        setUsers(response.data);
      })
      .catch(console.error)
      .finally(() => {
        setIsFetching(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSort = (key, order = 'asc') => {
    console.log({ key, order });
    const sortedUsers = [...users].sort((a, b) => {
      console.log(a[key], b[key]);
      // if (a[key] > b[key]) {
      //   if (order === 'asc') {
      //     return 1;
      //   }
      //   if (order === 'desc') {
      //     return -1;
      //   }
      // }

      // if (b[key] < a[key]) {
      //   if (order === 'asc') {
      //     return -1;
      //   }
      //   if (order === 'desc') {
      //     return 1;
      //   }
      // }
      // return 0;
      if (a[key] > b[key]) {
        return -1;
      }
      if (b[key] > a[key]) {
        return 1;
      }
      return 0;
    });
    console.log(sortedUsers);
    setUsers(sortedUsers);
  };

  const handleSearch = (search) => {
    console.log(search);
    let filteredUsers;
    if (search) {
      filteredUsers = [...users].filter(
        ({ name, username, website }) =>
          name.includes(search) ||
          username.includes(search) ||
          website.includes(search)
      );
    } else {
      console.log('Reset');
      setUsers(fetchedUsers);
      return;
    }
    setUsers(filteredUsers);
  };

  const value = {
    users,
    fetching,
    handleSearch,
    handleSort,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default AppContext;
