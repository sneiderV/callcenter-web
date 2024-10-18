export class Agent {
    username: string;
    password: string;
    email: string;
    dni: string;
    fullName: string;
    phoneNumber: string;
    role: string;

    constructor(username: string, password: string, email: string, dni: string, fullName: string, phoneNumber: string, role: string) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.dni = dni;
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
        this.role = role;
    }
}
