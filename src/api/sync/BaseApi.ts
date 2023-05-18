import { User, RefreshToken, AccessToken, FileId } from "../../models/ApiTypes";

type Tokens = RefreshToken & AccessToken;
const BACKEND_URL = "/api";

class BaseApi {
	private apiUrl: string;
	private accessToken: string | null = null;
	private refreshToken: string | null = null;

	constructor(url: string) {
		this.apiUrl = url;
		this.signIn({ login: "admin", password: "iwanttodie" });
	}

	// PUBLIC
	// Getters
	getAccessToken() {
		return new Promise<string>((resolve, reject) => {
			const intervalId = setInterval(() => {
				if (this.accessToken) {
					resolve(this.accessToken);
					clearInterval(intervalId);
				}
			}, 100);

			setTimeout(() => reject("getAccessToken error"), 5000);
		});
	}

	uploadFile(file: File) {
		return this.request<FileId>("/upload", {
			method: "POST",
			body: JSON.stringify({ file: file }),
		});
	}

	// PRIVATE
	// Generic for POST & GET requests
	private request<responseType>(
		url: string,
		requestOptions: {
			method: "POST" | "GET";
			body?: BodyInit;
		}
	) {
		// Refresh tokens if already signed in
		this.accessToken && this.refresh();

		const fetchOptions = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${this.accessToken}`,
			},
			...requestOptions,
		};

		return new Promise<responseType>((resolve, reject) => {
			fetch(`${this.apiUrl}${url}`, fetchOptions)
				.then((response) => response.text())
				.then((text) => resolve(JSON.parse(text)))
				.catch((error) => reject(error));
		});
	}

	// JWT Logic
	private signIn(user: User) {
		this.request<Tokens>("/sign-in", {
			method: "POST",
			body: JSON.stringify(user),
		}).then((tokens) => this.setTokens(tokens));
	}

	private refresh() {
		this.request<Tokens>("/refresh", {
			method: "POST",
			body: JSON.stringify({ refresh_token: this.refreshToken }),
		}).then((tokens) => this.setTokens(tokens));
	}

	private setTokens(tokens: Tokens) {
		this.accessToken = tokens.access_token;
		this.refreshToken = tokens.refresh_token;
	}
}

const baseApi = new BaseApi(BACKEND_URL);
export default baseApi;
