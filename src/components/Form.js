import { useState } from 'react';

const initialData = {
  name: '',
  email: '',
  age: '',
  occupation: '',
};

const Form = () => {
  const [data, setData] = useState(initialData);

  const handleChange = ({ target: { name, value } }) => {
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);

    setData(initialData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="form-control"
        type="text"
        name="name"
        placeholder="name"
        value={data.name}
        onChange={handleChange}
        required
      />
      <input
        className="form-control"
        type="email"
        name="email"
        placeholder="email"
        value={data.email}
        onChange={handleChange}
        required
      />
      <input
        className="form-control"
        type="number"
        name="age"
        placeholder="age"
        value={data.age}
        onChange={handleChange}
        required
      />
      <input
        className="form-control"
        type="text"
        name="occupation"
        placeholder="occupation"
        value={data.occupation}
        onChange={handleChange}
        required
      />
      <button className="btn btn-success" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Form;
