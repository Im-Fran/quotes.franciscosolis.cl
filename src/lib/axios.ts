import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
})


// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
window.axios = client

export default client