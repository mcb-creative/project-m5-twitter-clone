import React, { createContext, useState, useEffect } from "react";

export const CurrentUserContext = createContext(null);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [status, setStatus] = useState("loading");
  const [homeFeed, setHomeFeed] = useState([]);

  const [userProfile, setUserProfile] = useState([]);
  const [userProfileFeed, setUserProfileFeed] = useState([]);
  const [userHandle, setUserHandle] = useState();

  const [singleTweet, setSingleTweet] = useState([]);

  // Fetch the user data from the API (/me/profile)
  // When the data is received, update currentUser.
  // Also, set `status` to `idle`
  useEffect(() => {
    if (!currentUser) {
      fetch("/api/me/profile")
        .then((res) => res.json())
        .then((json) => {
          setCurrentUser(json);
        })
        .catch((error) => {
          setStatus("error");
        });
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      setStatus("idle");
    }
  }, [currentUser]);

  const getHomeFeed = () => {
    fetch("/api/me/home-feed")
      .then((res) => res.json())
      .then((json) => {
        const { tweetsById } = json;
        const tweetsByTime = Object.values(tweetsById).sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        setHomeFeed(tweetsByTime);
      })
      .catch((error) => {
        setStatus("error");
      });
  };

  const getUserProfile = async (ev) => {
    let user = ev.target.id;
    setUserHandle(user);
    await fetch(`/api/${user}/profile`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setUserProfile(json);
      })
      .catch((error) => {
        setStatus("error");
      });
  };

  useEffect(() => {
    if (userProfile) {
      fetch(`/api/${userHandle}/feed`)
        .then((res) => res.json())
        .then((json) => {
          const { tweetsById } = json;
          const tweetsByTime = Object.values(tweetsById).sort(
            (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
          );
          setUserProfileFeed(tweetsByTime);
        })
        .catch((error) => {
          setStatus("error");
        });
    }
  }, [userProfile]);

  const getSingleTweet = (tweetId) => {
    fetch(`/api/tweet/${tweetId}`)
      .then((res) => res.json())
      .then((json) => {
        setSingleTweet(json);
      })
      .catch((error) => {
        setStatus("error");
      });
  };

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        status,
        getHomeFeed,
        homeFeed,
        getUserProfile,
        userProfile,
        userHandle,
        getSingleTweet,
        singleTweet,
        userProfileFeed,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
