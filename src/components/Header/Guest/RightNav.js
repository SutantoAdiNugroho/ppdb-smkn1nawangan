import React from "react";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const StyledRightNav = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;

  .typo-li {
    padding: 15px 18px;
    margin-bottom: -10px;
    margin-top: 7px;
    text-decoration: none;
    color: #000000;
  }

  .typo-li:hover {
    color: #42b983;
  }

  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: #0d2538;
    position: fixed;
    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    z-index: 10;

    .typo-li {
      text-decoration: none;
      color: #fff;
    }

    .typo-li:hover {
      color: #42b983;
    }
  }
`;

const RightNav = ({ open }) => {
  return (
    <StyledRightNav open={open}>
      <Typography className="typo-li" component={Link} to={"/about"}>
        Tentang Kami
      </Typography>
      <Typography className="typo-li" component={Link} to={"/contact"}>
        Contact Center
      </Typography>
      <Typography className="typo-li" component={Link} to={"/ppdb"}>
        PPDB 2021
      </Typography>
    </StyledRightNav>
  );
};

export default RightNav;
