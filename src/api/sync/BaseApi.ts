import { User, RefreshToken, AccessToken, FileId } from "../../models/types";

type Tokens = RefreshToken & AccessToken;
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL!;

class BaseApi {
  private apiUrl: string;
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  private user: User | null = null;

  constructor(url: string) {
    this.apiUrl = url;
    this.initUser();
  }

  // PUBLIC
  async getAccessToken() {
    return new Promise<string>((resolve, reject) => {
      const intervalId = setInterval(() => {
        if (this.accessToken) {
          resolve(this.accessToken);
          clearInterval(intervalId);
        }
      }, 100);

      setTimeout(() => reject("Get AccessToken timeout error"), 1500);
    });
  }

  uploadFile(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    return this.request<FileId>(
      "/upload",
      {
        method: "POST",
        body: formData,
      },
      true,
      true
    );
  }

  // PRIVATE
  // Generic for POST & GET requests
  private request<responseType = never>(
    url: string,
    requestOptions: {
      method: "POST" | "GET";
      body?: BodyInit;
    },
    shouldRefresh = true,
    shouldRemoveContentType = false
  ) {
    // Refresh tokens if already signed in
    // shouldRefresh && this.refresh();

    const fetchOptions: {
      headers: { [header: string]: string };
    } = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${this.accessToken}`,
      },
      ...requestOptions,
    };

    !shouldRemoveContentType &&
      (fetchOptions.headers["Content-type"] = "application/json");

    return new Promise<responseType>((resolve, reject) => {
      fetch(`${this.apiUrl}${url}`, fetchOptions)
        .then((response) => response.text())
        .then((text) => {
          // Idk how to compare responseType to never
          if (text.length) {
            resolve(JSON.parse(text));
          }
          resolve({} as responseType);
        })
        .catch((error) => reject(error));
    });
  }

  // JWT Logic
  private async initUser() {
    this.user = {
      login: "321",
      password: "321",
    };

    await this.request("/sign-up", {
      method: "POST",
      body: JSON.stringify(this.user),
    });

    this.request<Tokens>(
      "/sign-in",
      {
        method: "POST",
        body: JSON.stringify(this.user),
      },
      false
    ).then((tokens) => this.setTokens(tokens));
  }

  private refresh() {
    this.request<Tokens>(
      "/refresh",
      {
        method: "POST",
        body: JSON.stringify({ refresh_token: this.refreshToken }),
      },
      false
    ).then((tokens) => this.setTokens(tokens));
  }

  private setTokens(tokens: Tokens) {
    this.accessToken = tokens.access_token;
    this.refreshToken = tokens.refresh_token;
  }
}

const baseApi = new BaseApi(BACKEND_URL);
export default baseApi;
