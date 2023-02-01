import { createAsyncThunk } from "@reduxjs/toolkit";

import firebase from "../../services/firebase";

import { fetchGetUser, fetchConfirmUser } from "../../app/fetchAPI/usersAPI";

import {
  setUsersStatus,
  setUserProfile,
  setUserCondition,
  setSignedIn,
} from "../slices/users.slice";

export const logIn = createAsyncThunk(
  "users/fetchGetUser",
  async (email, { dispatch }) => {
    dispatch(setUsersStatus("validating"));
    const response = await fetchGetUser(email);

    if (response.length <= 0) {
      dispatch(setUserCondition("unknown"));
      dispatch(setUsersStatus(""));
      return;
    }

    if (response.name === null || response.name.length <= 0) {
      dispatch(setUserCondition("confirm-registration"));
      dispatch(setUsersStatus(""));
      return;
    }

    if (!response.verified) {
      dispatch(setUserCondition("not-verified"));
      dispatch(setUsersStatus(""));
      return;
    }

    dispatch(setUserCondition("validated"));
    firebase.auth().onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        const { photoURL, displayName, accessToken } = await firebaseUser
          .multiFactor.user;

        const userProfile = {
          ...response,
          displayName,
          photoURL,
        };

        dispatch(setUserProfile(userProfile));
        localStorage.setItem("token", JSON.stringify(accessToken));
        localStorage.setItem("profile", JSON.stringify(userProfile));
        localStorage.setItem("signedIn", true);
        dispatch(setSignedIn(true));
        dispatch(setUsersStatus(""));
      }
    });
  }
);

export const confirmUser = createAsyncThunk(
  "users/fetchConfirmUser",
  async ({ email, localDisplayName }, { dispatch }) => {
    dispatch(setUsersStatus("verifiying"));
    const response = await fetchConfirmUser({
      email,
      localDisplayName,
    });

    if (!response.verified) {
      dispatch(setUserCondition("not-verified"));
      dispatch(setUsersStatus(""));
      return;
    }

    dispatch(setUserCondition("verified"));

    firebase.auth().onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        const { photoURL, displayName, accessToken } = await firebaseUser
          .multiFactor.user;

        const userProfile = {
          ...response,
          displayName,
          photoURL,
        };

        dispatch(setUserProfile(userProfile));
        localStorage.setItem("token", JSON.stringify(accessToken));
        localStorage.setItem("profile", JSON.stringify(userProfile));
        localStorage.setItem("signedIn", true);
        dispatch(setSignedIn(true));
        dispatch(setUsersStatus(""));
      }
    });
  }
);
