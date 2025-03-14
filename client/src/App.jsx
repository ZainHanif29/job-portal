import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Navbar from "./components/shared/navbar";
import Home from "./pages/main/home";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import Job from "./pages/main/job";

function App() {
  const appRouter = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/job", element: <Job /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
  ]);
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
