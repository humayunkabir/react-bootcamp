const Table = ({ data, headers, onSort, formatters = {} }) => {
  const formattersKeys = Object.keys(formatters);

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          {headers.map(({ name, sort }) =>
            sort ? (
              <th
                className="text-capitalize"
                style={{ cursor: 'pointer' }}
                onClick={() => onSort(name, sort)}
                key={name}
              >
                <div className=" d-flex justify-content-between">
                  {name}
                  {sort === 'asc' ? <span>&#9650;</span> : <span>&#9660;</span>}
                </div>
              </th>
            ) : (
              <th className="text-capitalize" key={name}>
                {name}
              </th>
            )
          )}
        </tr>
      </thead>
      <tbody>
        {data?.map((item) => (
          <tr key={item.id}>
            {headers.map(({ name }) => (
              <td key={name}>
                {formattersKeys.includes(name)
                  ? formatters[name](item[name])
                  : item[name]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
