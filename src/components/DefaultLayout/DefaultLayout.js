import React from "react";
import styles from "./DefaultLayout.scss";

function DefaultLayout({ children }) {
  return (
    <div className="wrapper">
      <div className="content">{children}</div>
    </div>
  );
}

export default DefaultLayout;
