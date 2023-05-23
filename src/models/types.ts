// SYNC
type User = {
	login: string;
	password: string;
};

type AccessToken = {
	access_token: string;
};

type RefreshToken = {
	refresh_token: string;
};

type FileId = {
	file_id: string;
};

// ASYNC
type Message = {
	id?: string;
	creating_dt?: string;
	is_server_owner?: boolean;
	text: string;

	files?: File[];
	options?: Option[];
};

type File = {
	id?: string;
	name: string;
	content_type?: string;
	size?: number;
};

type Option = {
	name: string;
	text: string;
};

export type { User, AccessToken, RefreshToken, Message, FileId };
