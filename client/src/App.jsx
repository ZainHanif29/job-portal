import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/main/home";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import Job from "./pages/main/job";
import Browse from "./pages/main/browse";
import Profile from "./pages/main/profile";
import JobDescription from "./pages/main/job-description";

function App() {
  const appRouter = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/job", element: <Job /> },
    { path: "/browse", element: <Browse /> },
    { path: "/profile", element: <Profile /> },
    { path: "/description/:id", element: <JobDescription /> },
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
