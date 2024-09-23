import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  timeout: 20000,
});

// https://api.themoviedb.org/3/trending/all/week?api_key=f03651e752cb458ce613557d520bd913&language=en-US

export default instance