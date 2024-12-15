import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage";
import NoteListPage from "./pages/NoteListPage";
import UserPage from "./pages/UserPage";
import NotePage from "./pages/NotePage";
import RegisterPage from "./pages/RegistarPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <div className="flex">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/notes" element={<NoteListPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/note/:id" element={<NotePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  </StrictMode>
);
