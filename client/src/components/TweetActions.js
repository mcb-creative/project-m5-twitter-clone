import React, { useContext, useState } from "react";
import { FaRegComment, FaRetweet, FaRegHeart } from "react-icons/fa";
import styled from "styled-components";
import { FiShare } from "react-icons/fi";

const TweetActions = ({ retweet }) => {
  const [like, setLike] = useState(0);
  const [likeColor, setLikeColor] = useState("black");

  const handleLike = () => {
    if (like === 0) {
      setLike(like + 1);
      setLikeColor("#FF1493");
    } else {
      setLike(like - 1);
      setLikeColor("black");
    }
  };

  return (
    <Buttons>
      <CommentButton>
        <FaRegComment />
      </CommentButton>
      {retweet ? (
        <RetweetButton style={{ color: "green" }}>
          <FaRetweet />
          <span> 1</span>
        </RetweetButton>
      ) : (
        <RetweetButton>
          <FaRetweet />
        </RetweetButton>
      )}

      <LikeButton onClick={handleLike} style={{ color: likeColor }}>
        <FaRegHeart />
      </LikeButton>
      {like > 0 ? (
        <Like style={{ color: likeColor }}>{like}</Like>
      ) : (
        <Like></Like>
      )}
      <ShareButton>
        <FiShare />
      </ShareButton>
    </Buttons>
  );
};

export default TweetActions;

const Buttons = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const LikeButton = styled.button`
  padding: 2px;
`;

const Like = styled.span`
  padding-right: 10%;
`;

const RetweetButton = styled.button`
  padding: 2px;
  padding-right: 20%;
`;

const CommentButton = styled.button`
  padding-right: 20%;
`;

const ShareButton = styled.button`
  padding-left: 10%;
`;
