import { LoginModel } from "./auth.model.js";

class LoginService{
    #_loginModel
    constructor(){
        this.#_loginModel = new LoginModel()
    }

    async getAll(){
        const data = await this.#_loginModel.getAll()
        return data
    }

    async signUp({username,password}) {
        const [user] = await this.#_loginModel.userRetrieve({
            username
        })
        if (user) {
            return {
                message: "User already exists",
                status: 409
            };

        }


        const [newUser] = await this.#_loginModel
            .signUp({
                username,
                password
            })
            .catch(() => {
                return undefined;
            });

        if (!newUser) {
            throw new Error("Internal Server Error");
        }
        return {
            message: "User created successfully",
            status: 201
        };
    }

    async signIn({username,password}){
        const [user] = await this.#_loginModel.signIn({username,password})
        if(user){
            return {...user,
                successfully:207
                }
        }
        return {
            message: "Invalid login or password",
            successfully: 401
        }
    }
    


    async updateUser({username,status}){
        const data = await this.#_loginModel.updateUser({username,status})
        const [user] = await this.#_loginModel.userRetrieve({
            username
        })
        if (user) {
            return {
            message: "User Successfully activated",
            status: 201
        }
        }

        return {
            message: "User not found",
            status: 201
        };
    }




}
export default new LoginService();
