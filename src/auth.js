import {getProfile, logout} from './components/api'
class Auth {
    constructor(){        
        this.authenticated = true
    }

    login(cb){
        this.authenticated = true
        cb()
    }

    logout(cb){
        this.authenticated = false
        logout()
        cb()
    }

    isAuthenticated(){
        return this.authenticated
    }

    userData(){
        getProfile().then( res => {
            if(res.message === "success"){
                //this.authenticated = true
                this.user = res.user
                return this.user
            }else{
                this.authenticated = false
            }
        })
    }
}

export default new Auth()