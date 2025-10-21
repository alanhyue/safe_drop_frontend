import axios from "axios";
import Cookies from "js-cookie";
import { API_URL } from "@/app_config";

export async function register(username, password) {
    await axios.post(`${API_URL}/register`, null, {
        params: { username, password },
    });
}


export function logout() {
    Cookies.remove("token");
}

export function getAuthHeader() {
    const token = Cookies.get("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
}
