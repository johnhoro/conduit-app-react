import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import NoMatch from "./components/NoMatch";
import SingleArticle from "./components/SingleArticle";
import Hero from "./components/Hero";
import HomeMain from "./components/HomeMain";
import { localStorageKey, userVerifyURL } from "./utils/constant";
import FullPageSpinner from "./components/FullPageSpinner";
import NewPost from "./components/NewPost";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import EditArticle from "./components/EditArticle";
import HomeArticle from "./components/HomeArticle";
import Post from "./components/Post";
import Loader from "./components/Loader";

class App extends React.Component {
  state = {
    isLoggedIn: false,
    user: null,
    isVerifying: true,
    profile: null,
    params: {
      username: "",
    },
  };
  fetchData = () => {
    let storagekey = localStorage[localStorageKey];
    fetch(userVerifyURL, {
      method: "GET",
      headers: {
        authorization: `Token ${storagekey}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then(({ errors }) => {
          return Promise.reject(errors);
        });
      })
      .then(({ user }) => this.updateUser(user))
      .catch((errors) => console.log(errors));
  };

  componentDidMount() {
    let storagekey = localStorage[localStorageKey];
    if (storagekey) {
      this.fetchData();
      // fetch(userVerifyURL, {
      //   method: "GET",
      //   headers: {
      //     authorization: `Token ${storagekey}`,
      //   },
      // })
      //   .then((res) => {
      //     if (res.ok) {
      //       return res.json();
      //     }
      //     return res.json().then(({ errors }) => {
      //       return Promise.reject(errors);
      //     });
      //   })
      //   .then(({ user }) => this.updateUser(user))
      // .catch((errors) => console.log(errors));
    } else {
      this.setState({ isVerifying: false });
    }
  }

  updateUser = (user, cb) => {
    this.setState({ isLoggedIn: true, user, isVerifying: false }, cb);
    localStorage.setItem(localStorageKey, user.token);
  };
  logout = () => {
    this.setState({
      isLoggedIn: false,
    });
    localStorage.clear();
    let { history } = this.props;
  };

  render() {
    if (this.state.isVerifying) {
      return <FullPageSpinner />;
    }

    return (
      <>
        <Header isLoggedIn={this.state.isLoggedIn} user={this.state.user} />
        {this.state.isLoggedIn ? (
          <AuthenticatedApp
            user={this.state.user}
            updateUser={this.updateUser}
            logout={this.logout}
          />
        ) : (
          <UnauthenticatedApp
            updateUser={this.updateUser}
            user={this.state.user}
          />
        )}
      </>
    );
  }
}

function AuthenticatedApp(props) {
  return (
    <Switch>
      <Route path="/" exact>
        <Hero />
        <HomeMain />
      </Route>
      <Route path="/new-post">
        <NewPost user={props.user} />
      </Route>
      <Route path="/updateArticle/:slug">
        <EditArticle user={props.user} />
      </Route>
      <Route path="/setting">
        <Settings
          user={props.user}
          updateUser={props.updateUser}
          logout={props.logout}
        />
      </Route>
      <Route path="/profile/:username">
        <Profile user={props.user} />
      </Route>
      <Route path="/articles/:slug">
        <SingleArticle user={props.user} />
      </Route>
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  );
}
function UnauthenticatedApp(props) {
  return (
    <Switch>
      <Route path="/" exact>
        <Hero />
        <HomeMain />
      </Route>
      <Route path="/login">
        <Login updateUser={props.updateUser} />
      </Route>
      <Route path="/signup">
        <SignUp updateUser={props.updateUser} />
      </Route>
      <Route path="/articles/:slug">
        <SingleArticle user={props.user} />
      </Route>
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  );
}

export default App;
