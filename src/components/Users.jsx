import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Users() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    emailId: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/users', formData);
      setFormData({ firstName: '', lastName: '', emailId: '' });
      fetchData();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const updateUser = async (id) => {
    const userToUpdate = users.find(user => user.id === id);
    const updatedFirstName = prompt('Enter updated first name:', userToUpdate.firstName);
    const updatedLastName = prompt('Enter updated last name:', userToUpdate.lastName);
    const updatedEmailId = prompt('Enter updated email:', userToUpdate.emailId);

    try {
      await axios.put(`http://localhost:5000/users/${id}`, {
        firstName: updatedFirstName,
        lastName: updatedLastName,
        emailId: updatedEmailId
      });
      fetchData();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div>
      <h1>Users</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" />
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" />
        <input type="text" name="emailId" value={formData.emailId} onChange={handleChange} placeholder="Email" />
        <button type="submit">Add User</button>
      </form>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <p>Name: {user.firstName} {user.lastName}</p>
            <p>Email: {user.emailId}</p>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
            <button onClick={() => updateUser(user.id)}>Update</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
