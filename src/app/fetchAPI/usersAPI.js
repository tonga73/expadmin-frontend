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
  console.log(localDisplayName, "API");
  try {
    const { data } = await axiosClient.patch(`/users/${email}`, {
      name: localDisplayName,
    });

    return data;
  } catch (error) {
    console.log(error);
  }
}
