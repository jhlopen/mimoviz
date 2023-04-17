import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>This is not the page you are looking for.</p>
      <Link to="/">Back to home</Link>
    </div>
  );
}

export default NotFound;
