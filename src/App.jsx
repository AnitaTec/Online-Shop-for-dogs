import { Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import Main from "./pages/main";
import Categories from "./pages/categories";
import Products from "./pages/products";
import Sales from "./pages/sales";
import Basket from "./pages/basket";
import AllCategory from "./components/AllCategoryComponents";
import NotFoundPage from "./pages/NotFoundPage";
import ProductReview from "./components/ProductReview";

export default function App() {
  return (
    <>
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
    </>
  );
}
