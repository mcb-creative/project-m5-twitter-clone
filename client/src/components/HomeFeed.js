import React, { useEffect, useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import SmallTweet from "./SmallTweet";
import TweetInput from "./TweetInput";
import LoadingIcon from "./LoadingIcon";
import Error from "./Error";
import styled from "styled-components";

const HomeFeed = () => {
  const { status, homeFeed, getHomeFeed } = useContext(CurrentUserContext);

  useEffect(() => {
    getHomeFeed();
  }, []);

  if (status === "loading") {
    return (
      <div>
        <LoadingIcon />
      </div>
    );
  } else if (status === "error") {
    return (
      <div>
        <Error />
      </div>
    );
  }

  return (
    <div>
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
      <Title>Home</Title>
      <TweetInput />
      {Object.values(homeFeed).map((tweet) => {
        return (
          <div>
            <SmallTweet
              tweetId={tweet.id}
              displayName={tweet.author.displayName}
              userPic={tweet.author.avatarSrc}
              handle={tweet.author.handle}
              timestamp={tweet.timestamp}
              retweetFrom={tweet.retweetFrom}
              tweetStatus={tweet.status}
              media={tweet.media}
              isRetweeted={tweet.isRetweeted}
              isLiked={tweet.isLiked}
            />
          </div>
        );
      })}
    </div>
  );
};

export default HomeFeed;

const Title = styled.h1`
  padding-bottom: 20px;
  border-bottom: solid 1.25px rgb(235, 238, 240);
`;
