import { createContext, useCallback, useContext, useState } from "react";
import { Message, UserCredentials, UserData, UserInfo } from "../api/types";
import { authApi, chatApi } from "../api";
import { Message as ClientMessage } from "../components/ChatInput/ChatInput";
import { MessageCallback } from "../api/chat";

export type IAuthContext = {
    user: UserInfo | null;
    signIn: (credentials: UserCredentials) => Promise<void>;
    signOut: () => void;
    signUp: (data: UserData) => Promise<void>;
    verifyEmail: (tokenId: string) => Promise<void>;
    sendMessage: (message: ClientMessage) => void;
    addMessageListener: (cb: MessageCallback) => void;
};

export const AuthContext = createContext<IAuthContext>({
    user: null,
    signIn: async () => undefined,
    signOut: () => undefined,
    signUp: async () => undefined,
    verifyEmail: async () => undefined,
    sendMessage: () => undefined,
    addMessageListener: () => undefined,
});

// Static methods
const verifyEmail = (tokenId: string) => authApi.verifyEmail(tokenId);
const signUp = (data: UserData) => authApi.signUp(data);
const sendMessage = (message: ClientMessage) => authApi.sendMessage(message);
const addMessageListener = (cb: MessageCallback) =>
    chatApi.addMessageListener(cb);

export const AuthProvider: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const [user, setUser] = useState<UserInfo | null>(null);

    const signIn = useCallback(
        (credentials: UserCredentials) =>
            authApi.signIn(credentials).then(() => {
                authApi.getUserInfo().then(setUser);
            }),
        []
    );

    const signOut = useCallback(() => {
        authApi.signOut();
        setUser(null);
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                signIn,
                signUp,
                signOut,
                verifyEmail,
                sendMessage,
                addMessageListener,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthentication = () => useContext(AuthContext);
