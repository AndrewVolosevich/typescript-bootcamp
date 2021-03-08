import axios from "axios";
import {Cell} from "../types/game";

export default {
  getStartData: (size: number) => {
    return axios.post(
      `http://localhost:5555/${size}`,
      []
    );
  },
  uploadNewData: (size: number, filledData: Cell[]) => {
    return axios.post(
      `http://localhost:5555/${size}`,
      filledData
    );
  }
}