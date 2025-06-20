import React from 'react';
import { BrowserRouter, Routes, Route, Link, Outlet, useParams } from 'react-router-dom';

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function UsersLayout() {
  return (
    <div>
      <h2>Users</h2>
      <Outlet />
    </div>
  );
}

function UserList() {
  return (
    <ul>
      <li><Link to="1">User 1</Link></li>
      <li><Link to="2">User 2</Link></li>
      <li><Link to="3">User 3</Link></li>
    </ul>
  );
}

function UserDetail() {
  const { userId } = useParams();
  return <h3>User ID: {userId}</h3>;
}

function App() {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/users">Users</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="users" element={<UsersLayout />}>
          <Route index element={<UserList />} />
          <Route path=":userId" element={<UserDetail />} />
        </Route>
        <Route path="*" element={<h2>404 Not Found</h2>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
