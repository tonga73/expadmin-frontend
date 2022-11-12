import { axiosClient } from "../../app/axiosClient";

// OBTIENE TODAS LAS NOTAS
export async function fetchGetNotes() {
  try {
    const { data } = await axiosClient(`/notes`);

    return data;
  } catch (error) {
    console.log(error);
  }
}

// CREAR NUEVA NOTA
export async function fetchNewNote(req) {
  try {
    const { data } = await axiosClient.post(`/notes`, req);

    return data;
  } catch (error) {
    console.log(error);
  }
}
