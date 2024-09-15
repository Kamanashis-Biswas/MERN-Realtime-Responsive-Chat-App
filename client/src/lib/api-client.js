import axios from "axios";
import { HOST } from "@/utilis/constants";

export const apiClient = axios.create({
  baseURL: HOST,
});
