import { useAlertStore } from "@/store/alert";
import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const res = err.response;
    const pushAlert = useAlertStore.getState().pushAlert;

    const data: { error: { message: string }[] } = res.data;
    const status = res.status;

    if (data.error) {
      data.error.map((error) => {
        pushAlert({
          message: error.message,
          status: status,
        });
      });
    }
  }
);

export default api;
