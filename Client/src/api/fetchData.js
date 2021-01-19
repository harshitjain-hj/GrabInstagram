import axios from "axios";

const VIDEO_URL = "http://localhost:5000/instagram/feed";

export const fetchData = async (query) => {
  const response = await axios.get(VIDEO_URL, {
    params: {
      url: query,
    },
  });

  return response.data;
};
