import { createContext, useState, useEffect } from "react";

const API_URL = "http://127.0.0.1:5000";

type UserDTO = {
    name: string
    email: string
    password?: string 
}

type SessionContextProps = {
    userLogged: UserDTO | null
    signIn: (email: string, password: string) => Promise<void>
    signUp: (name: string, email: string, password: string) => Promise<void>
    signOut: () => void
}

export const SessionContext = createContext({} as SessionContextProps)

type SessionProviderProps = {
    children: React.ReactNode
}

export function SessionProvider({children}: SessionProviderProps) {
    const [userLogged, setUserLogged] = useState<UserDTO | null>(null)

    useEffect(() => {
        const token = sessionStorage.getItem("access_token");
        if (token) {
            fetchUserProfile(token);
        }
    }, []);

    async function fetchUserProfile(token: string) {
        try {
            const response = await fetch(`${API_URL}/api/profile`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (response.ok) {
                const userData = await response.json();
                setUserLogged({
                    name: userData.name,
                    email: userData.email
                });
            } else {
                signOut();
            }
        } catch (error) {
            console.error("Erro ao recuperar sessão:", error);
            signOut();
        }
    }

    async function signIn(email: string, password: string) {
        try {
            const response = await fetch(`${API_URL}/api/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Erro ao fazer login");
            }

            sessionStorage.setItem("access_token", result.access_token);

            await fetchUserProfile(result.access_token);

        } catch (error) {
            throw error;
        }
    }

    async function signUp(name: string, email: string, password: string) {
        try {
            const response = await fetch(`${API_URL}/api/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Erro ao cadastrar");
            }

        } catch (error) {
            throw error;
        }
    }

    function signOut() {
        sessionStorage.removeItem("access_token");
        setUserLogged(null);
    }

    return (
        <SessionContext.Provider value={{userLogged, signIn, signUp, signOut}}>
            {children}
        </SessionContext.Provider>
    )
}