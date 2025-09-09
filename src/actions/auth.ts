"use server"

import { User } from "@/@types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const login = async (): Promise<User> => {
    const cookieStore = await cookies()
    try {
        const res = await fetch("https://randomuser.me/api/?results=1&nat=us", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            throw new Error("Failed to login");
        }

        const data = await res.json() as { results: User[] };
        const user = data.results[0];

        cookieStore.set("dm-access-token",
            user.login.uuid,
            { httpOnly: true, path: '/', maxAge: 60 * 60 * 24 * 7 }
        );

        return user;

    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
};

export const doesUserLoggedIn = async (): Promise<boolean> => {
    const cookieStore = await cookies()
    const token = cookieStore.get("dm-access-token")
    return !!token
}

export const logout = async () => {
    const cookieStore = await cookies()
    cookieStore.delete("dm-access-token")
    redirect("/login")
}