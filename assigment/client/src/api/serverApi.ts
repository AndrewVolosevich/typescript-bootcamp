import axios from "axios";

export default {
  getStartData: (width: number) => {
    return axios.post(
      `http://localhost:5555/${width}`,
      []
    );
  },
}