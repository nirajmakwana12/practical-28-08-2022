import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FristPage from "./compoent/FristPage";
import SecondPage from "./compoent/SecondPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FristPage />} />
        <Route path="/2" element={<SecondPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
