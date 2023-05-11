import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Header,
  MyDashboard,
  Courses,
  CoursePage,
  ModulePage,
  WorkshopPage,
  Workshops,
  AdminDashboard,
  LectureCreate,
  LectureUpdate,
  SignIn,
  ManageCourse,
} from "./components/index.mjs";
import { Box } from "@mui/material";
import { useAuth } from "./components/useAuth";
import "./App.css";

const queryClient = new QueryClient();

const PrivateRoute = ({ children }) => {
  let auth = useAuth();
  if (!auth.validateSession()) {
    return <Navigate to="/learning/signin" />;
  }
  return children;
};

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Box>
          <Header sx={{ fontFamily: "Roboto" }} />
          <Routes>
            <Route path="/" element={<Courses />} />
            <Route path="/learning/signin" element={<SignIn />} />
            <Route
              path="/learning/admin"
              element={
                <PrivateRoute>
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/learning/admin/courses/:id"
              element={
                <PrivateRoute>
                  <ManageCourse />
                </PrivateRoute>
              }
            />
            <Route
              path="/learning/admin/course/:cid/editor"
              element={
                <PrivateRoute>
                  <LectureCreate />
                </PrivateRoute>
              }
            />
            <Route
              path="/learning/admin/course/:cid/module/:mid/editor"
              element={<LectureUpdate />}
            />
            <Route
              path="/learning/dashboard/:type"
              element={
                <PrivateRoute>
                  <MyDashboard />
                </PrivateRoute>
              }
            />
            <Route path="/learning/courses" element={<Courses />} />
            <Route
              path="/learning/courses/:id"
              element={
                <PrivateRoute>
                  <CoursePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/learning/courses/:id/module/:lid"
              element={
                <PrivateRoute>
                  <ModulePage />
                </PrivateRoute>
              }
            />
            <Route path="/learning/workshops" element={<Workshops />} />
            <Route path="/learning/workshops/:id" element={<WorkshopPage />} />
          </Routes>
        </Box>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
