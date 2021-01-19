import axios from "axios";
import fileDownload from "js-file-download";

export const saveData = async (link, filename) => {
  await axios
    .get(link, {
      responseType: "blob",
    })
    .then((res) => {
      fileDownload(res.data, filename);
    });
};
