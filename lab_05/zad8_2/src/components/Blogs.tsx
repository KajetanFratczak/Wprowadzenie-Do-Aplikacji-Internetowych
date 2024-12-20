import { Link } from "react-router-dom";

const Blogs = () => {
  const articles = JSON.parse(localStorage.getItem("articles") || "[]");

  return (
    <div>
      <h1>Lista artykułów</h1>
      <ul>
        {articles.map((article: any) => (
          <li key={article.id}>
            <Link to={`/article/${article.id}`}>{article.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blogs;