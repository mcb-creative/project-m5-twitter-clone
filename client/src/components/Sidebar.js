import React, { useContext } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { COLORS } from "./constants";
import { GiCat } from "react-icons/gi";
import { CurrentUserContext } from "./CurrentUserContext";
import { ReactComponent as Logo } from "../assets/logo.svg";

const Sidebar = () => {
  const { getUserProfile, userProfile, currentUser } = useContext(
    CurrentUserContext
  );

  return (
    <NavBar>
      <Logo color={COLORS.primary} />
      <NavigationLink exact activeClassName="active" to="/">
        Home
      </NavigationLink>
      <NavigationLink
        id={currentUser.profile.handle}
        onClick={getUserProfile}
        to={`/profile/${currentUser.profile.handle}`}
      >
        Profile
      </NavigationLink>
      <NavigationLink to="/notifications">Notifications</NavigationLink>
      <NavigationLink to="/bookmarks">Bookmarks</NavigationLink>
    </NavBar>
  );
};

export default Sidebar;

const NavBar = styled.div`
  height: 100%;
  width: 150px;
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  background-color: #fff;
  overflow-x: hidden;
  padding-top: 20px;
`;

const NavigationLink = styled(NavLink)`
  padding: 12px 8px 12px 16px;
  text-decoration: none;
  font-size: 16px;
  font-weight: bold;
  color: #000;
  display: block;

  &.active {
    color: ${COLORS.primary};
  }
`;
