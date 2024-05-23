import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { FirebaseContext } from "./store/Context";
import Context from "./store/Context";
import firebase from "./firebase/config";

// Find the root element
const rootElement = document.getElementById("root");

// Create a root and render the application
const root = createRoot(rootElement);
root.render(
  <FirebaseContext.Provider value={{ firebase }}>
    <Context>
      <App />
    </Context>
  </FirebaseContext.Provider>
);
