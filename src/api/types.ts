interface UserInfo {
    id: string;
    email: string;
    first_name: string;
    second_name: string;
    patronymic?: string;
    has_avatar: boolean;
    admitted: boolean;
}

interface UserCredentials {
    email: string;
    password: string;
}

export type { UserInfo, UserCredentials };
