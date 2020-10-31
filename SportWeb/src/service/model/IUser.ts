export interface  IUser {
    userId: number;
    firstName: string;
    lastName: string;
    login: string;
    password: any;
    passwordExpired:Date;
    roleId: string;
    userModified:string;
    lastModified:string;
}
