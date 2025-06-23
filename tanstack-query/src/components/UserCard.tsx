import { Link } from 'react-router-dom';
import type { User } from '../api/users';

interface UserCardProps {
  user: User;
}

export const UserCard = ({ user }: UserCardProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
      <p className="text-gray-600">@{user.username}</p>
      <p className="text-blue-600 hover:text-blue-800 mt-2">
        <Link to={`/users/${user.id}`} className="flex items-center">
          View Profile & Albums
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </p>
    </div>
  );
};
