import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "./CurrentUserContext";
import LoadingIcon from "./LoadingIcon";
import Error from "./Error";
import { COLORS } from "./constants";
import { GrLocation, GrCalendar } from "react-icons/gr";
import moment from "moment";

const ProfileHeader = () => {
  const { userProfile, status } = useContext(CurrentUserContext);
  console.log(userProfile);

  return Object.values(userProfile).map((item) => {
    return (
      <Wrapper>
        {status === "loading" && (
          <div>
            <LoadingIcon />
          </div>
        )}
        {status === "error" && (
          <div>
            <Error />
          </div>
        )}
        <Header>
          <Banner src={`${item.bannerSrc}`} />
          <ProfilePic src={`${item.avatarSrc}`} />
          {item.isFollowingYou && <Following>Following</Following>}
          <DisplayName>{item.displayName}</DisplayName>
          <Handle>@{item.handle}</Handle>
          {item.isFollowingYou && <Follower>Follows you</Follower>}
          <p>{item.bio}</p>
          <ProfileInfoWrapper>
            {item.location && (
              <ProfileInfo>
                <GrLocation /> {item.location}
              </ProfileInfo>
            )}
            <ProfileInfo>
              <GrCalendar /> Joined {moment(item.joined).format("MMMM YYYY")}
            </ProfileInfo>
          </ProfileInfoWrapper>
          <ProfileInfoWrapper>
            <ProfileInfo>{item.numFollowers} followers</ProfileInfo>{" "}
            <ProfileInfo>{item.numFollowing} following</ProfileInfo>
          </ProfileInfoWrapper>
        </Header>
      </Wrapper>
    );
  });
};

export default ProfileHeader;

const Wrapper = styled.div``;

const Header = styled.div`
  width: 100%;
`;

const ProfilePic = styled.img`
  border-radius: 100%;
  position: relative;
  border: solid 3px white;
  margin-left: 25px;
  margin-top: -75px;
  z-index: 10;
  height: 16vh;
  width: 8vw;
`;

const Banner = styled.img`
  /* box-sizing: border-box; */
  width: 100%;
`;

const Following = styled.span`
  background-color: ${COLORS.primary};
  font-weight: bold;
  color: white;
  float: right;
  padding: 10px 20px;
  border-radius: 25px;
  margin-top: 10px;
  font-size: 1rem;
`;

const Follower = styled.span`
  position: absolute;
  background-color: #e0e0e0;
  padding: 2.5px 5px;
  border-radius: 10px;
  margin-top: -35px;
  margin-left: 100px;
  font-size: 0.85rem;
`;

const DisplayName = styled.h3`
  margin: 0;
`;

const Handle = styled.p`
  margin-top: 5px;
  margin-bottom: 10px;
`;

const ProfileInfoWrapper = styled.div`
  margin: 10px 0px;
`;

const ProfileInfo = styled.span`
  padding-right: 10px;
`;
