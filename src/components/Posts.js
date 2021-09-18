import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Table from './Table';

const Posts = () => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then(({ data }) => {
        setPosts(data);
      })
      .catch(console.error);
  }, []);

  return <Table data={posts} headers={['title', 'body', 'userId']} />;
};

export default Posts;
