export { removetv } from "../reducers/tvSlice";
import Axios from "../../Utills/Axios";
import { loadtv } from "../reducers/tvSlice";

export const asyncloadtv = (id) => async (dispatch, getState) => {
  try {
    const detail = await Axios.get(`/tv/${id}`);
    const externalid = await Axios.get(`/tv/${id}/external_ids`);
    const recomdeation = await Axios.get(`/tv/${id}/recommendations`);
    const similar = await Axios.get(`/tv/${id}/similar`);
    const translations = await Axios.get(`/tv/${id}/translations`);
    const videos = await Axios.get(`/tv/${id}/videos`);
    const provier = await Axios.get(`/tv/${id}/watch/providers`);
    let theultimate = {
      detail: detail.data,
      externalid: externalid.data,
      recomdeations: recomdeation.data.results,
      simlar: similar.data,
      translations: translations.data.translations.map((t) => t.name),
      videos: videos.data.results.find((m) => m.type === "Trailer"),
      watchproviders: provier.data.results.IN,
    };
    console.log(theultimate);
    dispatch(loadtv(theultimate));
  } catch (err) {
    console.log(err);
  }
};
