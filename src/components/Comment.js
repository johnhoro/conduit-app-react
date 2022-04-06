import React from "react";
import { withRouter } from "react-router-dom";

function Comment(props) {
  return (
    <section className="container">
      <div className="comment-box">
        <div className="comnt-body">
          <p>{props.body}</p>
        </div>
        <div className="post-comment flex space-between item-center">
          <div className="flex center">
            <img src={props.user.image} alt={props.user.username} />
            <p>{props.user.username}</p> <p>{props.createdAt}</p>
          </div>
          <div
            onClick={() => props.deleteComment(props.id)}
            className="delete-comment"
          >
            <i className="fas fa-trash"></i>
          </div>
        </div>
      </div>
    </section>
  );
}
export default withRouter(Comment);
