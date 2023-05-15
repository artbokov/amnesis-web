import AuthApi from "./AuthApi";

const authApi = new AuthApi();

authApi.signIn({login: "admin", password: "iwanttodie"}).then(r => console.log(r));

export {
    authApi,
};