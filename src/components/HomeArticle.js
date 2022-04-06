import React from "react";
import Loader from "./Loader";
import Post from "./Post";
import { withRouter } from "react-router-dom";

class HomeArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { articles, error, fetchData, favoriteArticle, unFavoriteArticle } =
      this.props;

    if (error) {
      return <p>{error}</p>;
    }
    if (!articles) {
      return <Loader />;
    }
    if (articles.length < 1) {
      return <h2>No Articles Found!</h2>;
    }
    return (
      <>
        {articles.map((article) => (
          <Post key={article.slug} {...article} fetchData={fetchData} />
        ))}
      </>
    );
  }
}

export default withRouter(HomeArticle);
