import Signup from './components/Signup';
import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from './components/HomePage';
import Login from './components/Login';
import { useSelector } from "react-redux";
import { SocketProvider } from './redux/SocketContext';  // Import SocketProvider

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/login",
    element: <Login />
  },
]);

function App() {
  const { authUser } = useSelector(store => store.user);  // Select authUser from the Redux store

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      {/* Wrap your app with SocketProvider and pass authUser */}
      <SocketProvider authUser={authUser}>
        <RouterProvider router={router} />
      </SocketProvider>
    </div>
  );
}

export default App;
