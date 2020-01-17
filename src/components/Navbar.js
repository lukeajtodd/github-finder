import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Navbar({ icon, title }) {
  return (
    <nav className="navbar bg-primary">
      <h1>
        <Link to="/">
          <FontAwesomeIcon icon={["fab", icon]} /> {title}
        </Link>
      </h1>
      <ul>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

Navbar.defaultProps = {
  title: "Github Finder",
  icon: "github"
};

export default Navbar;
