import { axiosClient } from "../../app/axiosClient";

export async function fetchGetRecords() {
  try {
    const { data } = await axiosClient("/records");

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchGetRecord(id) {
  try {
    const { data } = await axiosClient(`/records/${id}`);

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchNewRecord(req) {
  try {
    const { data } = await axiosClient.post("/records", req);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchEditRecord({ id, req }) {
  try {
    const { data } = await axiosClient.patch(`/records/${id}`, req);

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchDeleteRecord(id) {
  try {
    const { data } = await axiosClient.delete(`/records/${id}`);

    return data;
  } catch (error) {
    console.log(error);
  }
}
