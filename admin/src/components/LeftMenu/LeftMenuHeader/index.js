import React from "react";
import { Link } from "react-router-dom";

import Wrapper from "./Wrapper";

const LeftMenuHeader = () => (
  <Wrapper>
    <Link to="/" className="leftMenuHeaderLink">
      <h2>Killer Whale</h2>
    </Link>
  </Wrapper>
);

export default LeftMenuHeader;
