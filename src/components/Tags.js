import React from "react";
import Loader from "./Loader";

let tagsURL = "https://mighty-oasis-08080.herokuapp.com/api/tags";

class Tags extends React.Component {
  state = {
    tags: null,
    error: "",
  };

  componentDidMount() {
    fetch(tagsURL + `/?limit=10`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(({ tags }) => {
        this.setState({ tags, error: "" });
      })
      .catch((err) => {
        this.setState({ error: "Not able to fetch articles" });
      });
  }
  render() {
    const { tags, error } = this.state;
    if (error) {
      return <p>{error}</p>;
    }
    if (!tags) {
      return <Loader />;
    }

    return (
      <>
        <div className="tags">
          <h3>Popular Tags</h3>
          <div className="flex warp">
            {tags.map((tag) => (
              <span
                className="tag"
                key={tag}
                onClick={() => this.props.addTab(tag)}
              >
                {tag}{" "}
              </span>
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default Tags;
