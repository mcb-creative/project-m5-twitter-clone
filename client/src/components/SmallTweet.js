import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "./CurrentUserContext";
import { FaRetweet } from "react-icons/fa";
import TweetActions from "./TweetActions";
import moment from "moment";

const SmallTweet = ({
  displayName,
  userPic,
  handle,
  timestamp,
  tweetId,
  retweetFrom,
  tweetStatus,
  media,
  isRetweeted,
  isLiked,
}) => {
  const { getUserProfile } = useContext(CurrentUserContext);

  return (
    <Wrapper key={tweetId}>
      <TweetWrapper>
        <StyledLink to={`/tweet/${tweetId}`} />
        {retweetFrom && (
          <Retweet>
            <FaRetweet />
            {retweetFrom.displayName} Remeowed
          </Retweet>
        )}
        <ProfilePic src={userPic} />
        <TweetInfo>
          <DisplayName
            id={handle}
            onClick={getUserProfile}
            to={`/profile/${handle}`}
          >
            {displayName}
          </DisplayName>
          <Handle>@{handle}</Handle>
          <Timestamp>{moment(timestamp).format("MMM D")}</Timestamp>
        </TweetInfo>
        <Status>{tweetStatus}</Status>
        {media.map((mediaItem) => {
          return <Media src={mediaItem.url} />;
        })}
      </TweetWrapper>
      <TweetActions retweet={retweetFrom} />
    </Wrapper>
  );
};

export default SmallTweet;

const Wrapper = styled.div`
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  border-top: solid 1.25px rgb(235, 238, 240);
`;

const TweetInfo = styled.div`
  flex: 1;
  width: 90%;
  padding: 10px;
`;

const TweetWrapper = styled.div`
  width: 100%;
  position: relative;
`;

const StyledLink = styled(Link)`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  text-decoration: none;
  background-color: #fff;
  opacity: 0;
`;

const Retweet = styled.p`
  font-weight: bold;
`;

const DisplayName = styled(Link)`
  position: relative;
  font-weight: bold;
  z-index: 1;
  text-decoration: none;

  &:active,
  :hover {
    text-decoration: underline;
  }

  &:visited {
    color: #000;
    text-decoration: none;
  }
`;

const Handle = styled.span`
  /* font-weight: bold; */
  color: #5b7083;
  padding-left: 10px;
`;

const Timestamp = styled.span`
  padding-left: 10px;
`;

const Status = styled.p`
  padding-left: 60px;
`;

const ProfilePic = styled.img`
  top: 0;
  float: left;
  width: 50px;
  height: 50px;
  margin-right: 10px;
  border-radius: 100%;
`;

const Media = styled.img`
  border-radius: 10px;
  margin-left: 60px;
  height: calc(width / 1.75);
  width: 70%;
`;
