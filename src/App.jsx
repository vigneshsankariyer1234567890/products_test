import Layout from "./pages/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Categories } from "./pages/Categories";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Categories />} />
          {/* <Route path="category/:categoryName" element={<ProductsPage />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}
