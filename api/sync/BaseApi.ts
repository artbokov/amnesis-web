import { User, RefreshToken, AccessToken } from "../models/types";

type Tokens = RefreshToken & AccessToken;

// Рассчет на то, что api разрастется
class BaseApi {
	private apiUrl: string;
	private accessToken: string;
	private refreshToken: string;
	
	private isTokensInitialized = false;

	constructor(url: string) {
		this.apiUrl = url;
		this.signIn({ login: "admin", password: "iwanttodie" });
	}

	// PUBLIC
	// Generics for request
	postRequest<requestType, responseType>(
		url: string,
		body: requestType
	) {
		this.isTokensInitialized && this.refresh();

		return new Promise<responseType>((resolve, reject) => {
			fetch(`${this.apiUrl}${url}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${this.accessToken}`
				},
				body: JSON.stringify(body)
			})
				.then(response => response.text())
				.then(text => resolve(JSON.parse(text)))
		});
	}

	getRequest<responseType>(
		url: string
	) {
		this.isTokensInitialized && this.refresh();

		return new Promise<responseType>((resolve, reject) => {
			fetch(`${this.apiUrl}${url}`, { 
				headers: { "Authorization": `Bearer ${this.accessToken}` }
			})
				.then(response => response.text())
				.then(text => resolve(JSON.parse(text)))
		});
	}

	// Getters
	getAccessToken() {
		return this.accessToken;
	}

	// PRIVATE
	// JWT Logic
	private async signIn(user: User) {
		const tokens = await this.postRequest<User, Tokens>("/sign-in", user);
		this.setTokens(tokens);
	}

	private async refresh() {
		const tokens = await this.postRequest<RefreshToken, Tokens>("/refresh", {
			refresh_token: this.refreshToken
		});
		this.setTokens(tokens);
	}

	private setTokens(tokens: Tokens) {
		this.accessToken  = tokens.access_token;
		this.refreshToken = tokens.refresh_token;

		this.isTokensInitialized = true;
	}
}

const baseApi = new BaseApi("http://oncoanalitika.com/api");
export default baseApi;