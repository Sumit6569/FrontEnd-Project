export { removeperson } from "../reducers/peopleSlice";
import Axios from "../../Utills/Axios";
import { loadperson } from "../reducers/peopleSlice";

export const asyncloadperson = (id) => async (dispatch, getState) => {
  try {
    const detail = await Axios.get(`/person/${id}`);
    const externalid = await Axios.get(`/person/${id}/external_ids`);
    const combinedCridts = await Axios.get(`/person/${id}/combined_credits`);
    const tvCredits = await Axios.get(`/person/${id}/tv_credits`);
    const movieCredits = await Axios.get(`/person/${id}/movie_credits`);

    let theultimate = {
      detail: detail.data,
      externalid: externalid.data,
      combinedCridts: combinedCridts.data,
      tvCredits: tvCredits.data,
      movieCredits: movieCredits,
    };
    console.log(theultimate);
    dispatch(loadperson(theultimate));
  } catch (err) {
    console.log(err);
  }
};
