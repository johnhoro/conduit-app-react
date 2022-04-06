import React from "react";
import { withRouter, Link, NavLink } from "react-router-dom";
import { articlesURL } from "../utils/constant";

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  favoriteArticle = (slug) => {
    fetch(articlesURL + `/${slug}/favorite`, {
      method: "POST",
      headers: {
        authorization: `Token ${localStorage.getItem("app_user")}`,
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
      .then(({ article }) => {
        console.log(article);
        this.props.fetchData();
      });
  };

  unFavoriteArticle = (slug) => {
    fetch(articlesURL + `/${slug}/favorite`, {
      method: "DELETE",
      headers: {
        authorization: `Token ${localStorage.getItem("app_user")}`,
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
      .then(({ article }) => {
        console.log(article);
        this.props.fetchData();
      });
  };
  render() {
    const {
      author,
      title,
      description,
      slug,
      tagList,
      createdAt,
      favoritesCount,
    } = this.props;
    console.log();
    return (
      <div className="home-article container">
        <article className="article">
          <div className="flex space-between">
            <div className="flex author">
              <Link to={`/profile/${author.username}`}>
                <img src={author.image} alt={author.username} />
              </Link>
              <div className="info flex column">
                <Link to={`/profile/${author.username}`}>
                  <p>{author.username}</p>
                </Link>
                <span className="date">{createdAt.split(`T`)[0]}</span>
              </div>
            </div>
            <div className="like">
              <button
                onClick={
                  favoritesCount === 0
                    ? () => this.favoriteArticle(slug)
                    : () => this.unFavoriteArticle(slug)
                }
              >
                <i className="fa-solid fa-heart"></i>
                {favoritesCount}
              </button>
            </div>
          </div>
          <Link to={`/articles/${slug}`}>
            <h2> {title}</h2>
            <p>{description}</p>
          </Link>
          <ul className="flex space-between">
            <NavLink to={`/articles/${slug}`}>
              <span>Read more</span>
            </NavLink>
            <div className="a-tag flex">
              {tagList.map((tag, i) => {
                return <li key={i}> {tag} </li>;
              })}
            </div>
          </ul>
        </article>
      </div>
    );
  }
}
export default withRouter(Post);
