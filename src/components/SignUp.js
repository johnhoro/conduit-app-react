import React from "react";
import validate from "./validate";
import { withRouter } from "react-router";

let signupURL = "https://mighty-oasis-08080.herokuapp.com/api/users";

class SignUp extends React.Component {
  state = {
    username: ``,
    email: ``,
    password: ``,
    errors: {
      username: ``,
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
    const { username, email, password } = this.state;
    fetch(signupURL, {
      method: `POST`,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: { username, email, password } }),
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
        console.log(user, `john`);
        this.props.updateUser(user);
        this.setState({ username: "", password: "", email: "" });
        this.props.history.push(`/`);
      })
      .catch((errors) => this.setState({ errors }));
  };

  render() {
    let { username, errors, email, password } = this.state;
    return (
      <section className="login">
        <h3>Sign-Up Page</h3>
        <div className="container">
          <form>
            <fieldset className="flex column">
              <label>Enter Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={this.handleChange}
              />
              <span>{errors.email}</span>
            </fieldset>
            <fieldset className="flex column">
              <label>Enter Username</label>
              <input
                type="text"
                name="username"
                value={username}
                onChange={this.handleChange}
              />
              <span>{errors.username}</span>
            </fieldset>
            <fieldset className="flex column">
              <label>Enter Bio</label>
              <input type="text" name="bio" />
              <span></span>
            </fieldset>
            <fieldset className="flex column">
              <label>Enter Profile Image</label>
              <input type="text" name="image" />
              <span></span>
            </fieldset>
            <fieldset className="flex column">
              <label>Enter Password</label>
              <input
                type="text"
                name="password"
                onChange={this.handleChange}
                value={password}
              />
              <span>{errors.password}</span>
            </fieldset>
            <fieldset className="flex column">
              <button
                className="submit"
                type="submit"
                onClick={this.handleSubmit}
                disabled={errors.email || errors.password || errors.username}
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

export default withRouter(SignUp);
