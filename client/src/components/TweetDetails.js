import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { CurrentUserContext } from "./CurrentUserContext";
import TweetActions from "./TweetActions";
import moment from "moment";

const TweetDetails = () => {
  const { getSingleTweet, singleTweet } = useContext(CurrentUserContext);
  const { tweetId } = useParams();

  useEffect(() => {
    getSingleTweet(tweetId);
  }, []);

  return (
    <>
      {Object.values(singleTweet).map((item) => {
        return (
          <Wrapper>
            <TweetWrapper>
              <ProfilePic src={item.author.avatarSrc} />
              <Author>{item.author.displayName} </Author>
              <Handle>@{item.author.handle}</Handle>
              <Status>{item.status}</Status>
              {item.media.map((mediaItem) => {
                return <Media src={mediaItem.url} />;
              })}
              <Timestamp>
                {moment(item.timestamp).format("h:mm A · MMMM D YYYY")}
              </Timestamp>
            </TweetWrapper>
            <TweetActions retweet={item.retweetFrom} />
          </Wrapper>
        );
      })}
    </>
  );
};

export default TweetDetails;

const Wrapper = styled.div`
  padding: 10px;
  border-top: solid 1.25px rgb(235, 238, 240);
`;

const TweetWrapper = styled.div`
  position: relative;
`;

const Author = styled.p`
  font-weight: bold;
`;

const Handle = styled.p`
  position: relative;
  color: #5b7083;
`;

const Timestamp = styled.p`
  padding-bottom: 10px;
`;

const Status = styled.p``;

const ProfilePic = styled.img`
  top: 0;
  width: 50px;
  height: 50px;
  border-radius: 100%;
`;

const Media = styled.img`
  border-radius: 10px;
  height: calc(width / 1.75);
  width: 70%;
`;

const Buttons = styled.div`
  display: flex;
  padding: 10px;
  justify-content: space-between;
  width: 100%;
  border-top: solid 1.25px rgb(235, 238, 240);
`;
