type User = {
	login: string,
	password: string
};

type AccessToken = {
	access_token: string
};

type RefreshToken = {
    refresh_token: string
};

export {
    User, 
    AccessToken,
    RefreshToken
};