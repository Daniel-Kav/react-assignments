import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProfile } from './components/UserProfile';
import { UserList } from './components/UserList';
import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow-sm">
            <div className="container mx-auto py-4 px-4">
              <h1 className="text-2xl font-bold text-gray-900">User Dashboard</h1>
            </div>
          </header>
          <main className="container mx-auto py-6">
            <Routes>
              <Route path="/" element={<UserList />} />
              <Route path="/users/:userId" element={<UserProfile />} />
            </Routes>
          </main>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
