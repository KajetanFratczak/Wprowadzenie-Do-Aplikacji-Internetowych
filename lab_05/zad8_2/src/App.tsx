import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Blogs from "./components/Blogs";
import AddArticle from "./components/AddArticle";
import Article from "./components/Article";
import NoPage from "./components/NoPage";

localStorage.setItem(
  "articles",
  JSON.stringify([
      { id: 1, title: "Pierwszy artykuł", content: "Treść pierwszego artykułu." },
      { id: 2, title: "Drugi artykuł", content: "Treść drugiego artykułu." },
      { id: 3, title: "Trzeci artykuł", content: "Treść trzeciego artykułu." }
  ])
);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="dodaj" element={<AddArticle />} />
          <Route path="article/:id" element={<Article />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
