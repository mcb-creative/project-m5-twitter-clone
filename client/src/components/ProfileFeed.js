import React, { useContext } from "react";
import styled from "styled-components";
import SmallTweet from "./SmallTweet";
import LoadingIcon from "./LoadingIcon";
import Error from "./Error";
import { CurrentUserContext } from "./CurrentUserContext";

const ProfileFeed = () => {
  const { userProfileFeed, status } = useContext(CurrentUserContext);

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
      {Object.values(userProfileFeed).map((tweet) => {
        return (
          <div>
            <SmallTweet
              displayName={tweet.author.displayName}
              userPic={tweet.author.avatarSrc}
              handle={tweet.author.handle}
              timestamp={tweet.timestamp}
              tweetId={tweet.id}
              retweetFrom={tweet.retweetFrom}
              tweetStatus={tweet.status}
              media={tweet.media}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ProfileFeed;
