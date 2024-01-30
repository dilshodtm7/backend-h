import LoginService from "./auth.service.js";
class LoginController{


    async getAll(req,res){
        const data = await LoginService.getAll()
        res.status(200).json(data)
    }
    async signIn(req,res){
        const {username,password} = req.body
        const data = await LoginService.signIn({username,password})
        res.status(200).json(data)
    }

    async signUp(req,res){
        const {username,password} = req.body
        const data = await LoginService.signUp({username,password})
        res.status(200).json(data)
    }

    async updateUser(req,res){
        const {username,status} = req.body

        const data = await LoginService.updateUser({username,status})
        res.status(200).json(data)
    }

   

}

export default new LoginController();
