import { axiosClient } from "../../app/axiosClient";

export async function fetchGetCourts() {
  try {
    const { data } = await axiosClient(`/courts`);

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchGetCourt(id) {
  try {
    const { data } = await axiosClient(`/courts/${id}`);

    return data;
  } catch (error) {
    console.log(error);
  }
}
