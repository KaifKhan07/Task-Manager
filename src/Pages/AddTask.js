// Pages/AddTask.js
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';

const AddTask = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [branch, setBranch] = useState('');
  const [validated, setValidated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (firstName === "" || lastName === "" || branch === "") {
      toast.error('Please fill all the input fields!');
      setValidated(true);
      return;
    }

    const newTask = {
      id: Date.now(),
      firstName,
      lastName,
      branch,
    };

    const existingTasks = JSON.parse(localStorage.getItem('Tasks')) || [];
    localStorage.setItem('Tasks', JSON.stringify([...existingTasks, newTask]));

    setFirstName('');
    setLastName('');
    setBranch('');
    setValidated(false);
    toast.success('Task Added Successfully!');
  };

  return (
    <div className="container">
      <h2 className="text-center mt-4">Add Task</h2>
      <Form className="w-50 mx-auto" noValidate validated={validated}>
        <Form.Group controlId="taskName" className="mt-4">
          <Form.Label>Task Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Task Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="assignedTo" className="mt-4">
          <Form.Label>Assigned To</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Assigned To"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="taskStatus" className="mt-4">
          <Form.Label>Task Status</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Task Status"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            required
          />
        </Form.Group>
        <Button className="mt-4" onClick={handleSubmit}>
          Add Task
        </Button>
      </Form>
    </div>
  );
};

export default AddTask;
