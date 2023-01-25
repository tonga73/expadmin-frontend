import { axiosClient } from "../../app/axiosClient";

export async function fetchGetUser(email) {
  try {
    const { data } = await axiosClient(`/users/${email}`);

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchConfirmUser({ email, displayName }) {
  try {
    const { data } = await axiosClient.patch(`/users/${email}`, {
      name: displayName,
    });

    return data;
  } catch (error) {
    console.log(error);
  }
}
