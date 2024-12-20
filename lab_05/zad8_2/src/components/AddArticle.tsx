import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddArticle = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleAddArticle = () => {
    const articles = JSON.parse(localStorage.getItem("articles") || "[]");
    const newArticle = {
      id: articles.length + 1,
      title,
      content,
    };
    localStorage.setItem("articles", JSON.stringify([...articles, newArticle]));
    navigate("/blogs");
  };

  return (
    <div>
      <h1>Dodaj nowy artykuł</h1>
      <input
        type="text"
        placeholder="Tytuł"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Treść"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleAddArticle}>Dodaj</button>
    </div>
  );
};

export default AddArticle;