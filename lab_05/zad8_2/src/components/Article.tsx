import { useParams } from "react-router-dom";

const Article = () => {
  const { id } = useParams();
  const articles = JSON.parse(localStorage.getItem("articles") || "[]");
  const article = articles.find((a: any) => a.id === parseInt(id || "0"));

  if (!article) {
    return <h2>Artykuł nie został znaleziony!</h2>;
  }

  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.content}</p>
    </div>
  );
};

export default Article;