import React from "react";
import Pagination from "./Pagination";
import { withRouter } from "react-router-dom";
import HomeArticle from "./HomeArticle";
import ProfileBanner from "./ProfileBanner";
import { articlesURL, userURL } from "../utils/constant";

class Profile extends React.Component {
  state = {
    activeTab: `author`,
    articles: [],
    profile: this.props.user,
  };

  componentDidMount() {
    this.fetchProfile();
    this.fetchData();
  }

  componentDidUpdate(preProps, preState) {
    if (preProps.match.params.username !== this.props.match.params.username) {
      this.fetchProfile();
      this.fetchData();
    }
  }

  fetchProfile = () => {
    console.log(this.props.match.params.username);
    fetch(userURL + `/${this.props.match.params.username}`)
      .then((data) => {
        if (!data.ok) {
          data.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        }
        return data.json();
      })
      .then(({ profile }) => {
        console.log({ profile });
        this.setState({ profile });
      })
      .catch((error) => console.log(error));
  };

  fetchData = () => {
    fetch(
      articlesURL +
        `/?${this.state.activeTab}=${this.props.match.params.username}`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Can not fetch data for specific user!`);
        }
        return res.json();
      })
      .then((data) => {
        this.setState({
          articles: data.articles,
        });
      })
      .catch((err) => {
        this.setState({ error: "Not able to fetch articles" });
      });
  };

  handleFollow = (username, user) => {
    console.log(username);
    fetch(userURL + `/${username}/follow`, {
      method: "POST",
      headers: {
        authorization: `Token ${this.props.user.token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        }
        return res.json();
      })
      .then(({ profile }) => {
        console.log(profile);
        this.setState({ profile: profile });
        // this.fetchProfile();
      })
      .catch((errors) => console.log(errors));
  };

  handleUnFollow = (username, user) => {
    fetch(userURL + `/${username}/follow`, {
      method: "DELETE",
      headers: {
        authorization: `Token ${this.props.user.token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        }
        return res.json();
      })
      .then(({ profile }) => {
        console.log(profile);
        this.fetchProfile();
      })
      .catch((errors) => console.log(errors));
  };

  handleActive = (tab) => {
    this.setState({ activeTab: tab }, () => {
      this.fetchData();
    });
  };
  render() {
    const { activeTab } = this.state;
    const { user } = this.props;
    return (
      <>
        <ProfileBanner
          profile={this.state.profile}
          user={this.props.user}
          handleFollow={this.handleFollow}
          handleUnFollow={this.handleUnFollow}
        />
        <section className="container">
          <div className="my-article">
            <button
              onClick={() => this.handleActive(`author`)}
              className={activeTab === `author` && `active`}
            >
              My Articles
            </button>
            <button
              onClick={() => this.handleActive(`favorited`)}
              className={activeTab === `favorited` && `active`}
            >
              Favorited Articles
            </button>
          </div>
          <HomeArticle articles={this.state.articles} />
          <Pagination />
        </section>
      </>
    );
  }
}

export default withRouter(Profile);
