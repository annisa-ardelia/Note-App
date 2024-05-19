import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NoteDetail from "./pages/NoteDetail.jsx";
//import NoteAdd from "./pages/NoteAdd.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "note/:id",
    element: <NoteDetail />,
  },
  /*{
    path: "addNote",
    element: <NoteAdd />,
  },*/
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);