import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMWQ4Zjg0YzJiODZjNWFmNzdjMjk0OTY5YWQ1MDgzYSIsInN1YiI6IjY2MWEwYmNiZDM2M2U1MDE0OTVlNzY2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mVZyZYHUBYINByYkVCNK9J-oO-JEo7dgC13IOzd0CpE",
  },
});

export default instance;
