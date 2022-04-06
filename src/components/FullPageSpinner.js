import React from "react";
class FullPageSpinner extends React.Component {
  render() {
    return (
      <>
        <div className="bouncing-loader" style={{ height: `100vh` }}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </>
    );
  }
}

export default FullPageSpinner;
