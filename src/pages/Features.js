import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';

const Features = () => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    district: '',
    country: '',
    gender: '',
  });

  const history = useHistory();
  const location = useLocation();

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));

    setFormData((prevFormData) => {
      const search = Object.keys(prevFormData)
        .filter((key) => prevFormData[key])
        .map((key) => `${key}=${prevFormData[key]}`)
        .join('&');

      history.push({ search: `?${search}` });
      return prevFormData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  useEffect(() => {
    const formDataQuery = {};
    // const params = location.search
    //   .slice(1)
    //   .split('&')
    //   .map((item) => item.split('='));

    // params.forEach((item) => {
    //   formDataQuery[item[0]] = item[1];
    // });

    const params = new URLSearchParams(location.search);

    for (var value of params.keys()) {
      formDataQuery[value] = params.get(value);
    }
    setFormData({ ...formData, ...formDataQuery });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Features</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="name"
          className="form-control mb-3"
          value={formData.name}
          name="name"
          onChange={handleChange}
        />
        <input
          placeholder="dob"
          className="form-control mb-3"
          value={formData.dob}
          name="dob"
          type="date"
          onChange={handleChange}
        />
        <input
          placeholder="district"
          className="form-control mb-3"
          value={formData.district}
          name="district"
          onChange={handleChange}
        />
        <input
          placeholder="country"
          className="form-control mb-3"
          value={formData.country}
          name="country"
          onChange={handleChange}
        />
        <input
          placeholder="gender"
          className="form-control mb-3"
          value={formData.gender}
          name="gender"
          onChange={handleChange}
        />
        <button className="btn btn-success" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Features;
