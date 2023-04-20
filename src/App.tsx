import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Chat, Info, Support } from "./pages";
import { Layout } from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Info />} />
          <Route path="chat" element={<Chat />} />
          <Route path="support" element={<Support />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
