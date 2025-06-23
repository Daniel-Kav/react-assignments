import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import type { Album, User } from '../api/users';
import { fetchUserById, fetchUserAlbums } from '../api/users';
import { Loader } from './Loader';

export const UserProfile = () => {
  const { userId } = useParams<{ userId: string }>();

  const {
    data: user,
    isLoading: isLoadingUser,
    error: userError,
  } = useQuery<User, Error>({
    queryKey: ['user', userId],
    queryFn: () => fetchUserById(userId!),
    enabled: !!userId,
  });

  const {
    data: albums,
    isLoading: isLoadingAlbums,
    error: albumsError,
  } = useQuery<Album[], Error>({
    queryKey: ['albums', userId],
    queryFn: () => fetchUserAlbums(userId!),
    enabled: !!userId,
  });

  if (isLoadingUser) {
    return <Loader />;
  }

  if (userError) {
    return <div className="text-red-500">Error loading user data</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <svg
          className="w-5 h-5 mr-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Users
      </Link>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">{user?.name}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">
              <span className="font-semibold">Email:</span> {user?.email}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Phone:</span> {user?.phone}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Website:</span> {user?.website}
            </p>
          </div>
          <div>
            <p className="text-gray-600">
              <span className="font-semibold">Company:</span> {user?.company.name}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Catchphrase:</span>{' '}
              {user?.company.catchPhrase}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">BS:</span> {user?.company.bs}
            </p>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold text-gray-700">Address:</h3>
          <p className="text-gray-600">
            {user?.address.street}, {user?.address.suite}
            <br />
            {user?.address.city}, {user?.address.zipcode}
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4 text-gray-800">Albums</h2>
        {isLoadingAlbums ? (
          <Loader />
        ) : albumsError ? (
          <div className="text-red-500">Error loading albums</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {albums?.map((album: Album) => (
              <div
                key={album.id}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="font-semibold text-gray-800">{album.title}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
