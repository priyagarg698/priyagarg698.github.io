import React from "react";
import classes from "./Layout.module.css";
import blueStackLogo from "../../assets/Logo.jpg";
function Layout(props) {
  return (
    <div>
      <header className={classes.header}>
        <div className={classes.Logo}>
          <img src={blueStackLogo} alt="Blue stacks"></img>
        </div>
      </header>
      <main className="row ">{props.children}</main>
    </div>
  );
}
export default Layout;
