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

interface Message {
    text: string;
    files: string[];
    options: {
        [key: string]: string;
    };
    commands: {
        [key: string]: string;
    };
}

interface RecivedMessage extends Omit<Message, "commands" | "files"> {
    id: string;
    chat_id: string;
    user_id?: string;
    owner: string;
    files: {
        id: string;
        name: string;
        content_type: string;
        size: number;
    }[];
    creating_dt: string;
}

export type { UserInfo, UserCredentials, UserData, RecivedMessage, Message };
