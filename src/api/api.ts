import axios from "axios";

// Базовый адрес сервера — чтобы не писать его каждый раз
const api = axios.create({
	baseURL: "http://localhost:3001/api",
});

export default api;
