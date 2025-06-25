// a custom hook to fetch users from the JSONPlaceholder API using tanstack query

import { useQuery } from '@tanstack/react-query';
import type { User } from '@/types/user';

export function useUsers() {
  return useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    },
  });
}
