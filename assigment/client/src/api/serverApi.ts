import axios from "axios";

export default {
  getStartData: (size: number) => {
    return axios.post(
      `http://localhost:5555/${size}`,
      []
    );
  },
}