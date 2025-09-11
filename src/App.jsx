import { Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import Main from "./pages/main";
import Categories from "./pages/categories";
import Products from "./pages/products";
import Sales from "./pages/sales";
import Basket from "./pages/basket";
import AllCategory from "./components/allCategoryComponents";
import NotFoundPage from "./pages/NotFoundPage";
import ProductReview from "./components/ProductReview";
import { AppContext } from "./context/AppContext";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  const BASE_URL = "http://localhost:3333";

  return (
    <AppContext.Provider value={{ BASE_URL }}>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:id" element={<AllCategory />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductReview />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </AppContext.Provider>
  );
}
