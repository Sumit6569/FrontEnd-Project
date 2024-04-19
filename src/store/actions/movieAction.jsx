export { removemovie } from "../reducers/movieSlice";
import Axios from "../../Utills/Axios";
import { loadmovie } from "../reducers/movieSlice";

export const asyncloadmovie = (id) => async (dispatch, getState) => {
  try {
    const detail = await Axios.get(`/movie/${id}`);
    const externalid = await Axios.get(`/movie/${id}/external_ids`);
    const recomdeation = await Axios.get(`/movie/${id}/recommendations`);
    const similar = await Axios.get(`/movie/${id}/similar`);
    const translations = await Axios.get(`/movie/${id}/translations`);
    const videos = await Axios.get(`/movie/${id}/videos`);
    const provier = await Axios.get(`/movie/${id}/watch/providers`);
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
    dispatch(loadmovie(theultimate));
  } catch (err) {
    console.log(err);
  }
};
