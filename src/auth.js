import {getProfile} from './components/api'
class Auth {
    constructor(){
        getProfile().then( res => {
            if(res.message === "success"){
                this.authenticated = true
                this.user = res.user
            }else{
                this.authenticated = false
            }
        })
    }

    login(cb){
        this.authenticated = true
        cb()
    }

    logout(cb){
        this.authenticated = false
        cb()
    }

    isAuthenticated(){
        return this.authenticated
    }

    userData(){
        return this.user
    }
}

export default new Auth()