import { axiosClient } from "../../app/axiosClient";

// OBTIENE TODAS LAS SECRETARIAS
export async function fetchGetOffices() {
  try {
    const { data } = await axiosClient(`/offices`);

    return data;
  } catch (error) {
    console.log(error);
  }
}

// OBTIENE SECRETARIAS POR ID DE JUZGADO
export async function fetchGetOfficesByCourtId(id) {
  try {
    const { data } = await axiosClient(`/offices/filter-by-court/${id}`);

    return data;
  } catch (error) {
    console.log(error);
  }
}

// OBTIENE SECRETARIA POR ID
export async function fetchGetOffice(id) {
  try {
    const { data } = await axiosClient(`/offices/${id}`);

    return data;
  } catch (error) {
    console.log(error);
  }
}
