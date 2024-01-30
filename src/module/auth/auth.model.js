import { PostgresModel } from "../../db/db.js";

export class LoginModel {
    #db
    constructor() {
        this.#db = new PostgresModel()
    }

    async getAll(){
        const data = await this.#db.fetch(`SELECT * FROM login`)
        return data
    }

    async userRetrieve({ username}) {
        const data = await this.#db.fetch(
            `
            SELECT * FROM login WHERE username = $1 
        `,
            username
        );

        return data;
    }

    async signIn({username,password}){
        const data = await this.#db.fetch(`SELECT * FROM login WHERE username = $1 AND password = $2`,username,password)
        return data
    }

    async signUp({username,password,winid,email}){
        const data = await this.#db.fetch(`INSERT INTO login (username,password) VALUES ($1,$2) RETURNING id`,username,password )
        return data
    }

    async updateUser({username,status}){
        const data = await this.#db.fetch(`UPDATE login SET status = $1 WHERE username = $2`,status,username)
        return data
    }
}

export default new LoginModel();
