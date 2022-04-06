import React from "react";
import { articlesURL } from "../utils/constant";
import { withRouter } from "react-router";
import Comment from "./Comment";

class CommentBox extends React.Component {
  state = {
    comment: "",
    comments: null,
    errors: {
      comment: "",
    },
  };
  handleChange = (event) => {
    let { name, value } = event.target;
    let errors = { ...this.state.errors };
    this.setState({ [name]: value, errors });
  };

  componentDidMount() {
    this.fetchComment();
  }

  fetchComment = () => {
    let slug = this.props.match.params.slug;
    console.log(`fetch`);
    fetch(articlesURL + `/${slug}/comments`)
      .then((res) => {
        if (!res.ok) {
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        }
        return res.json();
      })
      .then(({ comments }) => {
        console.log(comments);
        this.setState({
          comments,
          comment: "",
        });
      })
      .catch((errors) => console.log(errors));
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { comment } = this.state;
    let slug = this.props.match.params.slug;
    fetch(`${articlesURL}/${slug}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${this.props.user.token}`,
      },
      body: JSON.stringify({
        comment: {
          body: comment,
        },
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`can not create new comment`);
        }
        return res.json();
      })
      .then(({ comment }) => {
        this.fetchComment();
      })
      .catch((errors) => {
        this.setState({ errors });
      });
  };

  deleteComment = (id) => {
    console.log(`delete`);
    let slug = this.props.match.params.slug;
    fetch(`${articlesURL}/${slug}/comments/${id}`, {
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
        this.fetchComment();
      })
      .catch((errors) => {
        this.setState({ errors });
      });
  };

  render() {
    // let { body } = this.state.errors;
    console.log(`rerender`);

    return (
      <>
        <section className="container">
          <form className="comment-box">
            <fieldset>
              <textarea
                onChange={this.handleChange}
                type="text"
                name="comment"
                value={this.state.comment}
                placeholder="Write a comment..."
              />
            </fieldset>
            <div className="post-comment flex space-between">
              <img src={this.props.user.image} alt={this.props.user.username} />
              <button onClick={this.handleSubmit} type="submit">
                Post Comment
              </button>
            </div>
          </form>
        </section>
        <div>
          {this.state.comments &&
            this.state.comments.map((comment, i) => (
              <Comment
                key={i}
                {...comment}
                deleteComment={this.deleteComment}
                user={this.props.user}
              />
            ))}
        </div>
      </>
    );
  }
}
export default withRouter(CommentBox);
