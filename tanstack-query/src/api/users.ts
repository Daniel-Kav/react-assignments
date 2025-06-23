import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface Album {
  userId: number;
  id: number;
  title: string;
}

export const fetchUsers = async (): Promise<User[]> => {
  const { data } = await axios.get<User[]>(`${API_BASE_URL}/users`);
  return data;
};

export const fetchUserById = async (id: string): Promise<User> => {
  const { data } = await axios.get<User>(`${API_BASE_URL}/users/${id}`);
  return data;
};

export const fetchUserAlbums = async (userId: string): Promise<Album[]> => {
  const { data } = await axios.get<Album[]>(
    `${API_BASE_URL}/users/${userId}/albums`
  );
  return data;
};
