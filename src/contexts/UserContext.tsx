import React, { ReactNode, createContext, useContext, useState } from "react";
import { User } from "../models/types";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { baseApi } from "../api";

interface UserProviderProps {
    children: ReactNode
}

interface IUserContext {
  isAuthenticated: boolean;
  isLoading: boolean;
  user?: User;
  refreshUser: () => void;
  signin: (data: User) => Promise<void>;
  signup: (data: User) => Promise<void>;
  signout: () => void;
}

export const UserContext = createContext<IUserContext>({
  isAuthenticated: false,
  isLoading: true,
  user: undefined,
  refreshUser: () => {},
  signin: async () => {},
  signup: async () => {},
  signout: () => {},
});

export const UserProvider: React.FC<UserProviderProps> = (props) => {
  const queryClient = useQueryClient();
  const { mutateAsync: signin, isLoading: isSigningIn } = useMutation(baseApi.signin, {
    onSuccess: () => {

    },
    onError: () => {
      queryClient.invalidateQueries("current-user");
    }
  });
  const { mutateAsync: signup, isLoading: isSigningUp } = useMutation(baseApi.signup);
  const { data: user, isLoading: isLoadingUser, refetch: refetchUser } = useQuery(
    "current-user",
    baseApi.getCurrentUser,
    {
      useErrorBoundary: false
    }
  );

  const signinAction = async (data: User) => {
    queryClient.clear();
    await signin(data);
    await refetchUser();
  }

  const signoutAction = async () => {
    await baseApi.signout();
  }

  const signupAction = async (data: User) => {
    await signup(data);
  }

  const refreshUserAction = () => {
    queryClient.invalidateQueries("current-user");
  }

  return (
    <UserContext.Provider value={{
      isAuthenticated: !!user,
      isLoading: isLoadingUser || isSigningIn || isSigningUp,
      user: user,
      refreshUser: refreshUserAction,
      signin: signinAction,
      signout: signoutAction,
      signup: signupAction
    }}>
      {props.children}
    </UserContext.Provider>
  )
}

export const useAuthentication = () => {
  const data = useContext(UserContext);
  return data;
}
