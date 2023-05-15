import { User, RefreshToken, AccessToken } from "./types";
import baseApi from "./BaseApi";

type Tokens = RefreshToken & AccessToken;

class AuthApi {
	signIn(user: User) {
		return baseApi.postRequest<User, Tokens>("/sign-in", user);
	}

	refresh(token: RefreshToken) {
		return baseApi.postRequest<RefreshToken, Tokens>("/refresh", token);
	}
}

export default AuthApi;