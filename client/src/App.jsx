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
import Applicants from "./pages/admin/applicants";
import ProtectedRoute from "./ProtectedRoute";

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
    {
      path: "/admin/companies",
      element: (
        <ProtectedRoute>
          <Companies />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/companies/create",
      element: (
        <ProtectedRoute>
          <CreateCompany />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/companies/:id",
      element: (
        <ProtectedRoute>
          <CompanySetup />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/jobs",
      element: (
        <ProtectedRoute>
          <Jobs />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/job/create",
      element: (
        <ProtectedRoute>
          <JobCreate />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/job/:id/applicants",
      element: (
        <ProtectedRoute>
          <Applicants />
        </ProtectedRoute>
      ),
    },
  ]);
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
