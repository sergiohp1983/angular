export class user {
    id: number; // auto-increment, should not be sent in POST request to add new rows
    username: string;
    password: string;
    role_id: number;
    created_at: string;

    constructor(id: number, username: string, password: string, role_id: number, created_at: string) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.role_id = role_id;
        this.created_at = created_at;    
    }
}