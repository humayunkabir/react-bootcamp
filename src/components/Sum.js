import React from 'react';
import useSum from '../hooks/useSum';

const Sum = ({ initialState }) => {
  const sum = useSum(initialState);
  return <div>{sum}</div>;
};

export default Sum;
