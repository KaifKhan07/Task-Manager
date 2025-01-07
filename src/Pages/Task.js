import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Data from '../api/Data.json';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({
    id: 0,
    firstName: '',
    lastName: '',
    branch: ''
  });

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('Tasks')) || Data;
    setTasks(savedTasks);
  }, []);

  const saveToLocalStorage = (tasks) => {
    localStorage.setItem('Tasks', JSON.stringify(tasks));
  };

  const handleDelete = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    saveToLocalStorage(updatedTasks);
  };

  const handleEdit = (task) => {
    setEditingTask(task.id);
    setFormData(task);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdate = () => {
    const updatedTasks = tasks.map((task) =>
      task.id === formData.id ? { ...task, ...formData } : task
    );
    setTasks(updatedTasks);
    saveToLocalStorage(updatedTasks);
    setEditingTask(null);
    setFormData({ id: 0, firstName: '', lastName: '', branch: '' });
  };

  // Handle the checkbox for completing tasks
  const handleComplete = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, branch: task.branch === 'Completed' ? 'Pending' : 'Completed' } : task
    );
    setTasks(updatedTasks);
    saveToLocalStorage(updatedTasks);
  };

  return (
    <div className="container">
      <h2 className="text-center mt-4">Tasks</h2>

      {editingTask && (
        <Form className="my-4">
          <h4 className="text-center">Edit Task</h4>
          <Form.Group className="mb-3" controlId="formTaskName">
            <Form.Label>Task Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="Enter Task Name"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formAssignedTo">
            <Form.Label>Assigned To</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Enter Assigned To"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formTaskStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control
              type="text"
              name="branch"
              value={formData.branch}
              onChange={handleInputChange}
              placeholder="Enter Task Status"
              required
            />
          </Form.Group>
          <Button variant="primary" onClick={handleUpdate}>
            Update Task
          </Button>
          <Button
            variant="secondary"
            className="ms-2"
            onClick={() => setEditingTask(null)}
          >
            Cancel
          </Button>
        </Form>
      )}

      <table className="table table-bordered table-hover mt-4">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Task Name</th>
            <th>Assigned To</th>
            <th>Status</th>
            <th>Complete</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <tr key={task.id}>
                <td>{index + 1}</td>
                <td>{task.firstName}</td>
                <td>{task.lastName}</td>
                <td>
                  <span
                    className={`badge bg-${task.branch === 'Completed' ? 'success' : 'warning'}`}
                  >
                    {task.branch}
                  </span>
                </td>
                <td>
                  <Form.Check
                    type="checkbox"
                    className='checkbox-task'
                    checked={task.branch === 'Completed'}
                    onChange={() => handleComplete(task.id)}
                  />
                </td>
                <td className="d-flex gap-2">
                  <Button
                    variant="warning"
                    onClick={() => handleEdit(task)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No tasks available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Tasks;
