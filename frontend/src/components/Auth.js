const Auth = {

    login(token, expDate) {
        localStorage.setItem('token', token);
        localStorage.setItem('expDate', expDate)
    },

    logout(){
        localStorage.removeItem('token');
        localStorage.removeItem('expDate')
    },

    getAuth(){
        const expDate = new Date(localStorage.getItem('expDate')).getTime()
        const now = new Date().getTime();
        console.log("data exp" + expDate)
        console.log("data agr" + now)
        console.log("testeeeeeeeeeeeeee" + (localStorage.getItem('token') && expDate > now))
        return localStorage.getItem('token') && expDate > now;
    }
}

export default Auth;