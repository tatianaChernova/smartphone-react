import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Home from "./../pages/Home";
import CategoryPage from "./../pages/CategoryPage";
import NotFound from "./../pages/NotFound";

export default function AnimatedRoutes() {
  const location = useLocation();

  return (
  <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/catalog/:id?" element={<CategoryPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}