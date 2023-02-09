import { axiosClient } from "../../app/axiosClient";

export async function fetchGetUser(email) {
  try {
    const { data } = await axiosClient(`/users/${email}`);

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchConfirmUser({ email, localDisplayName }) {
  try {
    const { data } = await axiosClient.patch(`/users/${email}`, {
      name: localDisplayName,
    });

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchEditUser({ email, req }) {
  try {
    const { data } = await axiosClient.patch(`/users/${email}`, req);
    return data;
  } catch (error) {
    console.log(error);
  }
}
