import React from "react";
import { Link } from "react-router-dom";
import validate from "./validate";
import { withRouter } from "react-router";

let loginURL = "https://mighty-oasis-08080.herokuapp.com/api/users/login";

class Login extends React.Component {
  state = {
    email: ``,
    password: ``,
    errors: {
      email: ``,
      password: ``,
    },
  };

  handleChange = (event) => {
    let { name, value } = event.target;
    let errors = { ...this.state.errors };
    validate(errors, name, value);
    this.setState({ [name]: value, errors });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    fetch(loginURL, {
      method: `POST`,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: { email, password } }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        }
        return res.json();
      })
      .then(({ user }) => {
        this.props.updateUser(user);
        this.props.history.push(`/`);
      })
      .catch((error) => {
        this.setState((prevState) => {
          return {
            ...prevState,
            errors: {
              ...prevState.errors,
              email: `Email or Password is incorrect!`,
            },
          };
        });
      });
  };

  render() {
    const { errors, email, password } = this.state;
    return (
      <section className="login">
        <h3>Login Page</h3>
        <div>
          <Link to="/login">Need an account?</Link>
        </div>
        <div className="container">
          <form>
            <fieldset className="flex column">
              <label>Enter Email</label>
              <input
                type="email"
                name="email"
                onChange={this.handleChange}
                value={email}
              />
              <span>{errors.email}</span>
            </fieldset>
            <fieldset className="flex column">
              <label>Enter Password</label>
              <input
                type="password"
                name="password"
                onChange={this.handleChange}
                value={password}
              />
              <span>{errors.password}</span>
            </fieldset>
            <fieldset className="flex column">
              <button
                className="submit"
                onClick={this.handleSubmit}
                disabled={errors.email || errors.password}
                type="submit"
              >
                Submit
              </button>
            </fieldset>
          </form>
        </div>
      </section>
    );
  }
}

export default withRouter(Login);
