import { useState, useEffect } from 'react';

function useSum(number) {
  const [sum, setSum] = useState(0);

  useEffect(() => {
    setSum((number * (number + 1)) / 2);
  }, [number]);

  return {
    sum,
    setSum: () => {},
  };
}

export default useSum;
