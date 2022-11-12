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

// EDITAR NOTA
export async function fetchEditNote({ id, req }) {
  try {
    const { data } = await axiosClient.patch(`/notes/${id}`, req);

    return data;
  } catch (error) {
    console.log(error);
  }
}

// ELMINAR NOTA
export async function fetchDeleteNote(id) {
  try {
    const { data } = await axiosClient.delete(`/notes/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
}
