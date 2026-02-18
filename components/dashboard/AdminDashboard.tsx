
import React, { useState, useEffect } from 'react';
import { User } from '../../types';
import { getUsers } from '../../services/userService';

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = () => {
      try {
        const allUsers = getUsers();
        setUsers(allUsers);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-primary">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-accent"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6 text-white">Superadmin Dashboard</h1>
      <div className="bg-secondary shadow-xl rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-300">
            <thead className="text-xs text-gray-200 uppercase bg-gray-700/50">
              <tr>
                <th scope="col" className="px-6 py-3">User ID</th>
                <th scope="col" className="px-6 py-3">Email</th>
                <th scope="col" className="px-6 py-3">Role</th>
                <th scope="col" className="px-6 py-3 text-right">Credits</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="bg-secondary border-b border-gray-700 hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-100 whitespace-nowrap">{user.id}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      user.role === 'SUPERADMIN' 
                        ? 'bg-accent/20 text-accent' 
                        : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-mono">{user.credits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
