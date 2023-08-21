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

interface UserData {
    surname: string;
    name: string;
    patronymmic?: string;
    email: string;
    password: string;
    passwordRepeat: string;
}

export type { UserInfo, UserCredentials, UserData };
