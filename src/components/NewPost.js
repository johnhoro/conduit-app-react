import React from "react";
import validate from "./validate";
import { withRouter } from "react-router";

let articlesURL = "https://mighty-oasis-08080.herokuapp.com/api/articles";

class NewPost extends React.Component {
  state = {
    title: ``,
    description: ``,
    body: ``,
    tagList: ``,
    errors: {
      title: ``,
      description: ``,
      body: ``,
      tagList: ``,
    },
  };

  handleChange = (event) => {
    let { name, value } = event.target;
    let errors = { ...this.state.errors };
    this.setState({ [name]: value, errors });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, description, body, tagList } = this.state;
    fetch(articlesURL, {
      method: `POST`,
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${this.props.user.token}`,
      },
      body: JSON.stringify({
        article: {
          title,
          description,
          body,
          tagList: tagList.split(`,`).map((tag) => tag.trim()),
        },
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`can not create new article`);
        }
        return res.json();
      })
      .then(({ article }) => {
        console.log(article, `john`);
        this.setState({ title: "", description: "", tagList: "", body: "" });
        this.props.history.push(`/`);
      })
      .catch((errors) => this.setState({ errors }));
  };

  render() {
    let { title, errors, body, tagList, description } = this.state;
    return (
      <div className="container">
        <form className="new-post">
          <fieldset>
            <input
              type="text"
              placeholder="Article Title"
              value={title}
              name="title"
              onChange={this.handleChange}
            />
            <input
              type="text"
              placeholder="Enter description"
              value={description}
              name="description"
              onChange={this.handleChange}
            />
            <textarea
              placeholder="writr your article(In markdown format)"
              value={body}
              name="body"
              onChange={this.handleChange}
            ></textarea>
            <input
              type="text"
              placeholder="Enter Tags"
              value={tagList}
              name="tagList"
              onChange={this.handleChange}
            />
            <input
              type="submit"
              placeholder="Publish Title"
              className="submit"
              onClick={this.handleSubmit}
            />
          </fieldset>
        </form>
      </div>
    );
  }
}

export default withRouter(NewPost);
