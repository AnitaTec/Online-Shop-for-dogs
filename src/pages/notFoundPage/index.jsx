import { Link } from "react-router-dom";
import notFoundImage from "../../assets/images/404.png";
import "./notFoundPage.css"; // обычный импорт CSS

const NotFoundPage = () => {
  return (
    <div className="notFoundPage">
      <img
        src={notFoundImage}
        alt="404 Not Found"
        className="notFoundPage__image"
      />
      <h1 className="notFoundPage__title">Page Not Found</h1>
      <p className="notFoundPage__text">
        We’re sorry, the page you requested could not be found. <br /> Please go
        back to the homepage.
      </p>
      <Link to="/" className="notFoundPage__link">
        Go Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
