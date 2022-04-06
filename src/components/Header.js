import React from "react";
import { NavLink } from "react-router-dom";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    console.log(this.props.isLoggedIn);
    return (
      <header>
        <div className="container flex space-between">
          <strong>conduit</strong>
          {this.props.isLoggedIn ? (
            <AuthHeader user={this.props.user} />
          ) : (
            <NonAuthHeader />
          )}
        </div>
      </header>
    );
  }
}

function NonAuthHeader() {
  return (
    <ul className="flex">
      <li>
        <NavLink activeClassName="active" to="/" exact>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/login">
          Login
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/signup">
          Sign Up
        </NavLink>
      </li>
    </ul>
  );
}

function AuthHeader(props) {
  return (
    <ul className="flex">
      <li>
        <NavLink activeClassName="active" to="/" exact>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/new-post">
          New Article
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/setting">
          Settings
        </NavLink>
      </li>
      <li>
        <NavLink
          activeClassName="active"
          to={`/profile/${props.user.username}`}
        >
          {props.user.username}
        </NavLink>
      </li>
    </ul>
  );
}

export default Header;
