import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

const queryClient = new QueryClient();

const fetchPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const Posts = () => {
  const { data, isLoading, isError, error } = useQuery('posts', fetchPosts, {
    staleTime: 5000, // 5 segundos antes de considerar los datos como stale
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {data.slice(0, 5).map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Posts />
  </QueryClientProvider>
);

export default App;
