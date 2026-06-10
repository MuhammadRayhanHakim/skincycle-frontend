import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

// 🌟 Ganti dengan Client ID asli dari Google Cloud Console Anda nanti
const GOOGLE_CLIENT_ID =
  "14037760236-mj2b8q10or1vpmfb42f90v8k1r5nshej.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,
);
