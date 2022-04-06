import React from "react";
import HomeArticle from "./HomeArticle";
import Tags from "./Tags";
import Loader from "./Loader";
import FeedNav from "./FeedNav";
import Pagination from "./Pagination";

let articleURL = "https://mighty-oasis-08080.herokuapp.com/api/articles";

class HomeMain extends React.Component {
  state = {
    articles: [],
    activeTab: ``,
    error: "",
    articlesCount: 0,
    articlesPerPage: 10,
    activePageIndex: 1,
  };

  removeTab = () => {
    this.setState({ activeTab: `` });
  };
  addTab = (value) => {
    this.setState({ activeTab: value });
  };

  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate(_prevProps, prevState) {
    console.log(prevState);
    if (
      prevState.activePageIndex !== this.state.activePageIndex ||
      prevState.activeTab !== this.state.activeTab
    ) {
      this.fetchData();
    }
  }

  fetchData = () => {
    let limit = this.state.articlesPerPage;
    let offset = (this.state.activePageIndex - 1) * limit;
    let tag = this.state.activeTab;

    fetch(
      articleURL + `/?offset=${offset}&limit=${limit}` + (tag && `&tag=${tag}`)
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        this.setState({
          articles: data.articles,
          error: "",
          articlesCount: data.articlesCount,
        });
      })
      .catch((err) => {
        this.setState({ error: "Not able to fetch articles" });
      });
  };

  updateCurrentPageIndex = (index) => {
    this.setState({ activePageIndex: index }, this.fetchData);
  };

  render() {
    const {
      error,
      articles,
      activeTab,
      articlesCount,
      activePageIndex,
      articlesPerPage,
    } = this.state;
    if (error) {
      return <p>{error}</p>;
    }
    if (!articles) {
      return <Loader />;
    }
    return (
      <>
        <div className="flex container space-between">
          <section className="main-col1">
            <div className="global-feed">
              <FeedNav activeTab={activeTab} removeTab={this.removeTab} />
            </div>
            <div>
              <HomeArticle
                articles={articles}
                error={error}
                fetchData={this.fetchData}
              />
            </div>
            <Pagination
              articlesCount={articlesCount}
              articlesPerPage={articlesPerPage}
              activePageIndex={activePageIndex}
              updateCurrentPageIndex={this.updateCurrentPageIndex}
            />
          </section>
          <div className="main-col2">
            <Tags handleTagClick={this.handleTagClick} addTab={this.addTab} />
          </div>
        </div>
      </>
    );
  }
}

export default HomeMain;
