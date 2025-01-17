import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage";
import NoteListPage from "./pages/NoteListPage";
import UserPage from "./pages/UserPage";
import NotePage from "./pages/NotePage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./hooks/Auth";
import Sidebar from "./component/Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div>
    <Sidebar />
    <main>{children}</main>
  </div>
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/notes"
            element={
              <Layout>
                <NoteListPage />
              </Layout>
            }
          />
          <Route
            path="/user"
            element={
              <Layout>
                <UserPage />
              </Layout>
            }
          />
          <Route
            path="/note/:id"
            element={
              <Layout>
                <NotePage />
              </Layout>
            }
          />
          <Route
            path="/note"
            element={
              <Layout>
                <NotePage />
              </Layout>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
