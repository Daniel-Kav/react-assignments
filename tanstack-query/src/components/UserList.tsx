import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { User } from '../api/users';
import { fetchUsers } from '../api/users';
import { UserCard } from './UserCard';
import { UserTable } from './UserTable';
import { Loader } from './Loader';

type ViewMode = 'cards' | 'table';

export const UserList = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('cards');
  const {
    data: users,
    isLoading,
    error,
  } = useQuery<User[], Error>({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="text-red-500 p-4">
        Error loading users. Please try again later.
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Users</h2>
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            onClick={() => setViewMode('cards')}
            className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
              viewMode === 'cards'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Cards
          </button>
          <button
            type="button"
            onClick={() => setViewMode('table')}
            className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
              viewMode === 'table'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Table
          </button>
        </div>
      </div>

      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {users?.map((user: User) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      ) : (
        <UserTable users={users || []} />
      )}
    </div>
  );
};
