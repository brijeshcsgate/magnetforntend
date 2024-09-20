import React from "react";


const CommonLayout = (props) => (
  <React.Fragment>
    <div className="layout-body">{props.children}</div>
  </React.Fragment>
);
export default CommonLayout;
