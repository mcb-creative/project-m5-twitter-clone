import React, { useContext, useEffect } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import ProfileHeader from "./ProfileHeader";
import ProfileFeed from "./ProfileFeed";
import styled from "styled-components";
import LoadingIcon from "./LoadingIcon";
import Error from "./Error";

const Profile = () => {
  return (
    <Wrapper>
      <ProfileHeader />
      <ProfileFeed />
    </Wrapper>
  );
};

export default Profile;

const Wrapper = styled.div``;
