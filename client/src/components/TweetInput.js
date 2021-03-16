import React, { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import LoadingIcon from "./LoadingIcon";
import Error from "./Error";
import styled from "styled-components";
import { COLORS } from "./constants";

const TweetInput = () => {
  const { getHomeFeed, status, currentUser } = useContext(CurrentUserContext);

  console.log(currentUser);
  const [charCount, setCharCount] = useState(280);
  const [charCountColor, setCharCountColor] = useState("black");
  const [disable, setDisable] = useState(false);
  const [tweetStatus, setTweetStatus] = useState("");

  const handleChange = (ev) => {
    const tweet = ev.target.value;
    setCharCount(280 - tweet.length);
    if (charCount > 55) {
      setDisable(false);
      setCharCountColor("black");
    } else if (charCount > 0 && charCount < 56) {
      setDisable(false);
      setCharCountColor("#FFD700");
    } else if (charCount < 0) {
      setDisable(true);
      setCharCountColor("red");
      console.log("you have reached the limit");
    } else {
      setDisable(false);
      setCharCountColor("black");
    }
    setTweetStatus(tweet);
  };

  const handleTweet = (ev) => {
    ev.preventDefault();
    fetch("/api/tweet", {
      method: "POST",
      body: JSON.stringify({
        status: tweetStatus,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        getHomeFeed();
        console.log(json);
      });
  };

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
    <TweetArea>
      <ProfilePic src={currentUser.profile.avatarSrc} />
      <TweetForm>
        <TweetTextArea
          placeholder="What's happening?"
          onChange={handleChange}
        />
        <CharacterCount>
          <span style={{ color: charCountColor }}> {charCount}</span>
        </CharacterCount>
        <MeowButton disabled={disable} onClick={(ev) => handleTweet(ev)}>
          Meow
        </MeowButton>
      </TweetForm>
    </TweetArea>
  );
};

export default TweetInput;

const TweetArea = styled.div`
  display: flex;
  padding: 10px 10px;
  border-bottom: solid 10px rgb(235, 238, 240);
`;

const TweetTextArea = styled.textarea`
  width: 100%;
  border: none;
  padding-bottom: 20px;
`;

const ProfilePic = styled.img`
  top: 0;
  float: left;
  width: 50px;
  height: 50px;
  margin-right: 10px;
  border-radius: 100%;
`;

const TweetForm = styled.form`
  width: 100%;
`;

const CharacterCount = styled.p`
  width: 85%;
  float: left;
  text-align: right;
  padding-top: 10px;
  padding-right: 20px;
`;

const MeowButton = styled.button`
  color: white;
  width: 5vw;
  font-size: 1vw;
  background-color: ${COLORS.primary};
  padding: 1.5vh 0.5vw;
  float: right;
  border-radius: 20px;
`;
