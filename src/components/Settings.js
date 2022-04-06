import React from "react";
import { profileURL } from "../utils/constant";
import { withRouter } from "react-router";
class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "",
      username: "",
      bio: "",
      email: "",
      password: "",
      errors: {
        image: "",
        username: "",
        bio: "",
        email: "",
        password: "",
      },
    };
  }
  validateField = (Field) => {
    let FieldError;
    if (Field.length < 1) {
      FieldError = "This field can't be empty";
    }
    return FieldError;
  };
  validateBio = (bio) => {
    let bioError;
    if (bio.length < 5) {
      bioError = "This field can't be less than 2 words";
    }
    return bioError;
  };
  validatePassword = (password) => {
    let passwordError;
    if (password.length < 7) {
      passwordError = "Password can't be less than 6 characters";
    }
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/;
    if (!re.test(password)) {
      passwordError = "Password must contain a character and a Number";
    }
    return passwordError;
  };
  handleInput = ({ target }) => {
    let { name, value } = target;
    let errors = this.state.errors;
    switch (name) {
      case "image":
        errors.image = this.validateField(value);
        break;
      case "username":
        errors.name = this.validateField(value);
        break;
      case "bio":
        errors.bio = this.validateBio(value);
        break;
      case "email":
        errors.email = this.validateField(value);
        break;
      case "password":
        errors.password = this.validatePassword(value);
        break;
      default:
        break;
    }
    this.setState({ errors, [name]: value });
  };

  handleSubmit = (event) => {
    console.log(this.props.user.token, `efe`);
    event.preventDefault();
    const { image, username, bio, email, password } = this.state;
    console.log(this.state.password);
    fetch(profileURL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${this.props.user.token}`,
      },
      body: JSON.stringify({
        user: {
          image,
          username,
          bio,
          email,
          password,
        },
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        } else {
          return res.json();
        }
      })
      .then(({ user }) => {
        console.log(user);
        this.setState({
          image: "",
          username: "",
          bio: "",
          email: "",
          password: "",
        });
        this.props.updateUser({ ...user }, () => {
          this.props.history.push(`/`);
        });
      })
      .catch((errors) => {
        this.setState({ errors });
      });
  };
  componentDidMount = () => {
    this.setState({
      username: this.props.user.username,
      email: this.props.user.email,
      image: this.props.user.image,
      bio: this.props.user.bio,
      password: this.props.user.password,
    });
  };

  render() {
    let { image, username, bio, email, password } = this.state.errors;
    return (
      <>
        <div className="container">
          <form className="settings">
            <h2>Update Settings</h2>
            <input
              value={this.state.image}
              onChange={this.handleInput}
              type="text"
              id="image"
              name="image"
              placeholder="image"
            />
            <span>{image}</span>
            <input
              value={this.state.bio}
              onChange={this.handleInput}
              type="text"
              id="bio"
              name="bio"
              placeholder="bio"
            />
            <span>{bio}</span>
            <input
              value={this.state.username}
              onChange={this.handleInput}
              type="text"
              id="name"
              name="username"
              placeholder="name"
            />
            <span>{username}</span>
            <input
              value={this.state.email}
              onChange={this.handleInput}
              type="text"
              id="email"
              name="email"
              placeholder="email"
            />
            <span>{email}</span>
            <input
              value={this.state.password}
              onChange={this.handleInput}
              type="password"
              id="password"
              name="password"
              placeholder="new password"
            />
            <span>{password}</span>
            <button
              type="submit"
              onClick={this.handleSubmit}
              className="submit"
              disabled={image || username || bio || email || password}
            >
              Update
            </button>
          </form>
          <div className="logout-box">
            <button
              className="logout-btn"
              onClick={() => {
                this.props.logout();
                this.props.history.push("/");
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </>
    );
  }
}
export default withRouter(Settings);
