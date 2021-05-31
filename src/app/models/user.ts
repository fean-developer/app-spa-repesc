export class User {
    public id?: string;
    public name!: string;
    public document!: string;
    public email!: string;
    public password!: string;
    public isAdmin!: boolean;
    public token?: string;
}