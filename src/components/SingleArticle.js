import React from "react";
import { Link, withRouter } from "react-router-dom";
import Loader from "./Loader";
import CommentBox from "./CommentBox";

let articleURL = "https://mighty-oasis-08080.herokuapp.com/api/articles/";

class SingleArticle extends React.Component {
  state = {
    article: null,
    error: "",
  };

  componentDidMount() {
    let slug = this.props.match.params.slug;

    fetch(articleURL + slug)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        this.setState({
          article: data.article,
          error: "",
        });
      })
      .catch((err) => {
        this.setState({ error: "Not able to fetch articles" });
      });
  }

  updateArticle = () => {
    let slug = this.props.match.params.slug;
    fetch(articleURL + slug, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${this.props.user.token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`can not delete comment`);
        }
        return res.json();
      })
      .then(({ data }) => {
        console.log(data);
      })
      .catch((errors) => {
        this.setState({ errors });
      });
  };

  deleteArticle = () => {
    let slug = this.props.match.params.slug;
    fetch(articleURL + slug, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${this.props.user.token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`can not delete comment`);
        }
        return res.json();
      })
      .then(({ comment }) => {
        this.props.history.push(`/`);
      })
      .catch((errors) => {
        this.setState({ errors });
      });
  };
  render() {
    const { article, error } = this.state;
    let user = this.props.user;
    if (error) {
      return <p>{error}</p>;
    }
    if (!article) {
      return <Loader />;
    }
    return (
      <>
        <section className="single-article">
          <div className="container">
            <h5>{article.title}</h5>
          </div>
          <div className="flex author-box container">
            <img src={article.author.image} alt="img" />
            <div className="info flex column">
              <p>{article.author.username}</p>
              <span className="date">{article.createdAt.split(`T`)[0]}</span>
            </div>
            <div className="edit-article-btn">
              {user.username === article.author.username ? (
                <>
                  <Link to={`updateArticle/${article.slug}`}>
                    <button className="logout-btn">Edit Article</button>
                  </Link>
                  <Link to={`articles/${article.slug}`}>
                    <button className="logout-btn" onClick={this.deleteArticle}>
                      Delete Article
                    </button>
                  </Link>
                </>
              ) : (
                <p></p>
              )}
            </div>
          </div>
        </section>
        <section className="container single-article-body">
          <p>{this.state.article.body}</p>
          <span>{this.state.article.tagList}</span>
        </section>

        {user === null ? (
          <footer className="comment-footer">
            <div>
              <p>
                <Link to="/login">
                  <span>Sign in</span>
                </Link>
                or
                <Link to="/signup">
                  <span>sign up</span>
                </Link>
                to add comments on this article.
              </p>
            </div>
          </footer>
        ) : (
          <>
            <CommentBox user={user} />
          </>
        )}
      </>
    );
  }
}

export default withRouter(SingleArticle);
