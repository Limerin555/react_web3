// import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Layout from "@components/Layout";
import Home from "@components/Home";
import Features from "@components/Features";
import Contact from "@components/Contact";
import PageNotFound from "@components/PageNotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="features" element={<Features />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
