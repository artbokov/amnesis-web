import { User, RefreshToken, AccessToken } from "../models/types";

type Tokens = RefreshToken & AccessToken;

// Рассчет на то, что api разрастется
class BaseApi {
	private apiUrl: string;
	private accessToken: string | null = null;
	private refreshToken: string | null = null;

	constructor(url: string) {
		this.apiUrl = url;
		this.signIn({ login: "admin", password: "iwanttodie" });
	}

	// PUBLIC
	// Generic for POST & GET requests
	request<responseType>(
		url: string,
		requestOptions: {
			method: "POST" | "GET",
			body?: BodyInit 
		}
	) {
		// Refresh tokens if already signed in
		this.accessToken && this.refresh();

		const fetchOptions = {
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${this.accessToken}`
			},
			...requestOptions
		};

		return new Promise<responseType>((resolve, reject) => {
			fetch(`${this.apiUrl}${url}`, fetchOptions)
				.then(response => response.text())
				.then(text => resolve(JSON.parse(text)))
				.catch(error => reject(error));
		});
	}

	// Getters
	getAccessToken() {
		return this.accessToken;
	}

	// PRIVATE
	// JWT Logic
	private signIn(user: User) {
		this.setTokens(
			this.request<Tokens>("/sign-in", {
				method: "POST",
				body: JSON.stringify(user)
			})
		);
	}

	private refresh() {
		this.setTokens(
			this.request<Tokens>("/refresh", { 
				method: "POST",
				body: JSON.stringify({ refresh_token: this.refreshToken })
			})
		);
	}

	private async setTokens(tokensPromise: Promise<Tokens>) {
		const tokens = await tokensPromise;

		this.accessToken  = tokens.access_token;
		this.refreshToken = tokens.refresh_token;
	}
}

const baseApi = new BaseApi("http://oncoanalitika.com/api");
export default baseApi;