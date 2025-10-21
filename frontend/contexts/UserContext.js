"use client";

import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import api from "@/lib/api";

export const UserContext = createContext(null);

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    function updateUserInfo() {
        api
            .get("/auth/me")
            .then((res) => setUser(res.data))
            .catch(() => setUser(null));
    }

    useEffect(() => {
        // fetch current user if token exists
        const token = Cookies.get("token");
        if (token) {
            updateUserInfo()
        }
    }, []);

    const loginUser = async (username, password) => {
        const formData = new URLSearchParams();
        formData.append("username", username);
        formData.append("password", password);

        const res = await api.post('/auth/login', formData);
        const { access_token } = res.data;
        Cookies.set("token", access_token);

        updateUserInfo()
    };


    return (
        <UserContext.Provider value={{ user, setUser, loginUser, updateUserInfo }}>
            {children}
        </UserContext.Provider>
    );
}
