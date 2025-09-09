import { User } from "@/@types";
import { useEffect, useState } from "react";

interface UseUserReturn {
    user: User | null;
    userName: string;
}

export const useUser = (): UseUserReturn => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("dm-user");
        if (!storedUser) setUser(null);
        else setUser(JSON.parse(storedUser));
    }, []);

    return {
        user,
        userName: `${user?.name.first ?? ""} ${user?.name.last ?? ""}`,
    };
}