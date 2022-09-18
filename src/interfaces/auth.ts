export interface loginFormMap {
    authentication ?:string
    password ?:string
}

export interface userInfoFormMap {
    username?: string,
    firstname?: string,
    lastname?: string,
    password?: string,
    passwordConfirm?: string,
    email?: string,
    phone?: string,
    birthday?: string,
    terms?: boolean,
}