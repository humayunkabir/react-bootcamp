import { useCallback, useState } from 'react';

const Count = () => {
  const [count, setCount] = useState(0);
  const handleCount = useCallback(() => setCount((prev) => prev + 1), []);
  return (
    <div>
      <h1>{count}</h1>
      <button className="btn btn-primary btn-sm" onClick={handleCount}>
        +
      </button>
    </div>
  );
};

export default Count;
