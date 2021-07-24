import React from "react";
import Aux from "components/hoc/Auxilliary";
import Header from "components/header/";

const Layout = (props) => {
  return (
    <Aux>
      <main>
        <Header />
        <div>{props.children}</div>
      </main>
    </Aux>
  );
};

export default Layout;
