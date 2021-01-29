/*
 *
 * HomePage
 *
 */
/* eslint-disable */
import React, { memo } from "react";
import { get } from "lodash";
import { auth } from "strapi-helper-plugin";

import { Container } from "./components";

const HomePage = ({ history: { push } }) => {
  const username = get(auth.getUserInfo(), "firstname", "");

  return (
    <>
      <Container className="container-fluid">
        <h2>{username} - Dashboard</h2>
      </Container>
    </>
  );
};

export default memo(HomePage);
