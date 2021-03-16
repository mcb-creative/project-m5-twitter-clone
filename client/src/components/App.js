import React, { useContext, useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { CurrentUserContext } from "./CurrentUserContext";
import GlobalStyles from "./GlobalStyles";
import Sidebar from "./Sidebar";
import HomeFeed from "./HomeFeed";
import Notifications from "./Notifications";
import Bookmarks from "./Bookmarks";
import TweetDetails from "./TweetDetails";
import Profile from "./Profile";
import LoadingIcon from "./LoadingIcon";
import Error from "./Error";

function App() {
  const { status, currentUser } = useContext(CurrentUserContext);

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
    <BrowserRouter>
      <GlobalStyles />
      <Sidebar></Sidebar>
      <Switch>
        <Route exact path="/">
          <HomeFeed />
        </Route>
        <Route path="/notifications">
          <Notifications />
        </Route>
        <Route path="/bookmarks">
          <Bookmarks />
        </Route>
        <Route path="/tweet/:tweetId">
          <TweetDetails />
        </Route>
        <Route path="/profile/:profileId">
          <Profile />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
