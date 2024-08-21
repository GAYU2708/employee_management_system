import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    name: "",
    position: "",
    department: "",
    salary: "",
    performance_metrics: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();



  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.id]: e.target.value });
  };





  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); 
    if (!employee.name || !employee.position || !employee.department || !employee.salary || !employee.performance_metrics) {
      setError("All fields are required.");
      return;
    }

    axios.post('http://localhost:8081/employee/addemployee', employee)
      .then(result => {
        if (result.data.Status) {
          setEmployee({ name: "", position: "", department: "", salary: "", performance_metrics: "" }); // Reset form state
          navigate('/');
        } else {
          setError(result.data.Error);
        }
      })
      .catch(err => {
        console.error(err);
        setError("An error occurred. Please try again.");
      });
  };



  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Add Employee</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control rounded-0"
              id="name"
              placeholder="Enter Name"
              value={employee.name}
              onChange={handleChange}
            />
          </div>
          <div className="col-12">
            <label htmlFor="position" className="form-label">Position</label>
            <input
              type="text"
              className="form-control rounded-0"
              id="position"
              placeholder="Enter Your Position in Organisation"
              autoComplete="off"
              value={employee.position}
              onChange={handleChange}
            />
          </div>
          <div className="col-12">
            <label htmlFor="department" className="form-label">Department</label>
            <input
              type="text"
              className="form-control rounded-0"
              id="department"
              placeholder="Enter Your Department"
              value={employee.department}
              onChange={handleChange}
            />
          </div>
          <div className="col-12">
            <label htmlFor="salary" className="form-label">Salary</label>
            <input
              type="number"
              className="form-control rounded-0"
              id="salary"
              placeholder="Enter Your Salary"
              autoComplete="off"
              value={employee.salary}
              onChange={handleChange}
            />
          </div>
          <div className="col-12">
            <label htmlFor="performance_metrics" className="form-label">Performance Metrics</label>
            <input
              type="number"
              className="form-control rounded-0"
              id="performance_metrics"
              autoComplete="off"
              value={employee.performance_metrics}
              onChange={handleChange}
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">Add Employee</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
