// SYNC
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

// ASYNC
type File = {
    id: string,
    name?: string,
    content_type?: string,
    size?: number 
};

type Option = {
    name: string,
    text: string
};

type Message = {
    id?: string,
    creating_dt?: string,
    is_server_owner?: boolean,
    text?: string,

    files?: File[],
    options?: Option[]
};

export type {
    User, 
    AccessToken,
    RefreshToken,
    Message
};