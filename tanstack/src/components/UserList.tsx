import { useUsers } from "@/hooks/useUsers";
import type { User } from "@/types/user";

// get the users from the useUsers hook and display them in a list and style it with Tailwind CSS
export const UserList = () => {
  const { data: users, isLoading, error } = useUsers();

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">Error: {error.message}</div>;

  return (
    <ul className="space-y-4">
      {users?.map((user: User) => (
        <li key={user.id} className="p-4 border rounded shadow hover:bg-gray-100">
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
        </li>
      ))}
    </ul>
  );
}