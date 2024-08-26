'use client'

import React, { useState, useEffect } from 'react';
import { FaTrashAlt, FaCog } from 'react-icons/fa';

type Users = {
  id: number;
  fullname: string;
  email: string;
  role: string;
};

function Allusers() {
  const [users, setUsers] = useState<Users[]>([]);
  const [selectedUser, setSelectedUser] = useState<Users | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('care/superadmin/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'superadmin':
        return 'text-red-500';
      case 'admin':
        return 'text-green-500';
      default:
        return 'text-black';
    }
  };

  const handleDelete = async (userId: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`care/superadmin/user/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      alert('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user');
    }
  };

  const handleRoleUpdate = async (userId: number) => {
    const confirmUpdate = window.confirm('Are you sure you want to update this user to super_admin?');
    if (!confirmUpdate) return;

    try {
      const response = await fetch(`care/superadmin/user/${userId}`, {
        method: 'PUT', // or 'PUT' depending on your API
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify({ role: 'super_admin' }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user role');
      }

      // Update the user role in state
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, role: 'super_admin' } : user
        )
      );
      alert('User role updated successfully');
    } catch (error) {
      console.error('Error updating user role:', error);
      alert('Failed to update user role');
    }
  };

  return (
    <div>
      {users.map((user) => (
        <div key={user.id} className="flex items-center justify-between border-b py-2">
          <span className="w-1/12">{user.id}</span>
          <span className="w-3/12">{user.fullname}</span>
          <span className="w-6/12">{user.email}</span>
          <span className={`w-2/12 ${getRoleColor(user.role)}`}>{user.role}</span>
          <div className="w-2/12 flex justify-end space-x-12">
            <FaTrashAlt
              className="text-gray-500 cursor-pointer"
              onClick={() => handleDelete(user.id)}
            />
            <FaCog
              className="text-gray-500 cursor-pointer"
              onClick={() => handleRoleUpdate(user.id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Allusers;
