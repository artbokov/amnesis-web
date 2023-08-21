import { createContext, useCallback, useContext, useState } from "react";
import { UserCredentials, UserData, UserInfo } from "../api/types";
import { authApi } from "../api";

export type IAuthContext = {
    user: UserInfo | null;
    signIn: (credentials: UserCredentials) => Promise<void>;
    signOut: () => void;
    signUp: (data: UserData) => Promise<void>;
    verifyEmail: (tokenId: string) => Promise<void>;
};

export const AuthContext = createContext<IAuthContext>({
    user: null,
    signIn: async () => undefined,
    signOut: () => undefined,
    signUp: async () => undefined,
    verifyEmail: async () => undefined,
});

export const AuthProvider: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const [user, setUser] = useState<UserInfo | null>(null);

    const signOut = useCallback(() => {
        authApi.signOut();
        setUser(null);
    }, []);

    const signIn = useCallback(
        (credentials: UserCredentials) =>
            authApi.signIn(credentials).then(() => {
                authApi.getUserInfo().then(setUser);
            }),
        []
    );

    const signUp = useCallback((data: UserData) => authApi.signUp(data), []);

    const verifyEmail = useCallback(
        (tokenId: string) => authApi.verifyEmail(tokenId),
        []
    );

    return (
        <AuthContext.Provider
            value={{ user, signIn, signUp, signOut, verifyEmail }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthentication = () => useContext(AuthContext);
