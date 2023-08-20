import { createContext, useCallback, useContext, useState } from "react";
import { UserCredentials, UserInfo } from "../api/types";
import { authApi } from "../api";

export type IAuthContext = {
    user: UserInfo | null;
    signIn: (credentials: UserCredentials) => Promise<void>;
    signOut: () => void;
};

export const AuthContext = createContext<IAuthContext>({
    user: null,
    signIn: async () => undefined,
    signOut: () => undefined,
});

export const AuthProvider: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const [user, setUser] = useState<UserInfo | null>(null);

    const signOut = useCallback(() => {
        authApi.signOut();
        setUser(null);
    }, [setUser]);

    const signIn = useCallback(
        (credentials: UserCredentials) =>
            authApi.signIn(credentials).then(() => {
                authApi.getUserInfo().then(setUser);
            }),
        [setUser]
    );

    return (
        <AuthContext.Provider value={{ user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthentication = () => useContext(AuthContext);
