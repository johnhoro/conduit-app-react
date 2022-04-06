import React from "react";
class Loader extends React.Component {
  render() {
    return (
      <>
        <div className="bouncing-loader">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </>
    );
  }
}

export default Loader;
