import React, { useState } from 'react';
import UserList from './components/UserList';
import AddUserForm from './components/AddUserForm';
import './Users.css';

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Alice Smith', email: 'alice@example.com' },
    { id: 2, name: 'Bob Johnson', email: 'bob@example.com' }
  ]);

  const addUser = (user) => {
    setUsers(prevUsers => [...prevUsers, { ...user, id: Date.now() }]);
  };

  const deleteUser = (userId) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
  };

  return (
    <div className="user-management">
      <h1>User Management</h1>
      <UserList users={users} onDelete={deleteUser} />
      <AddUserForm onAddUser={addUser} />
    </div>
  );
};

export default UserManagement;
