import { createAsyncThunk } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

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

    dispatch(setUserCondition(""));
    dispatch(setUserProfile(response));
    localStorage.setItem("profile", JSON.stringify(response));
    localStorage.setItem("signedIn", true);
    dispatch(setSignedIn(true));
    dispatch(setUsersStatus(""));
  }
);

export const confirmUser = createAsyncThunk(
  "users/fetchConfirmUser",
  async ({ email, displayName }, { dispatch }) => {
    dispatch(setUsersStatus("verifiying"));
    const response = await fetchConfirmUser({
      email,
      displayName,
    });

    if (!response.verified) {
      dispatch(setUserCondition("not-verified"));
      dispatch(setUsersStatus(""));
      return;
    }

    dispatch(setUserCondition("verified"));
    dispatch(setUserProfile(response));
    localStorage.setItem("profile", JSON.stringify(response));
    localStorage.setItem("signedIn", true);
    dispatch(setSignedIn(true));
    dispatch(setUsersStatus(""));
    return;
  }
);
