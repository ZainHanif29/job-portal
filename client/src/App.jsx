import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/main/home";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import Job from "./pages/main/job";
import Browse from "./pages/main/browse";
import Profile from "./pages/main/profile";
import JobDescription from "./pages/main/job-description";
import Companies from "./pages/admin/companies";
import CreateCompany from "./pages/admin/company-create";
import CompanySetup from "./pages/admin/company-setup.";
import Jobs from "./pages/admin/jobs";
import JobCreate from "./pages/admin/job-create";

function App() {
  const appRouter = createBrowserRouter([
    // Student
    { path: "/", element: <Home /> },
    { path: "/job", element: <Job /> },
    { path: "/browse", element: <Browse /> },
    { path: "/profile", element: <Profile /> },
    { path: "/description/:id", element: <JobDescription /> },
    // Auth
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    // Admin
    { path: "/admin/companies", element: <Companies /> },
    { path: "/admin/companies/create", element: <CreateCompany /> },
    { path: "/admin/companies/:id", element: <CompanySetup /> },
    { path: "/admin/jobs", element: <Jobs /> },
    { path: "/admin/job/create", element: <JobCreate /> },
  ]);
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
