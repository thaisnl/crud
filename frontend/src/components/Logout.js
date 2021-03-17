// import React, { useState, useEffect } from 'react';
// import { Link, Redirect } from 'react-router-dom';
// import axios from 'axios';
// import Auth from './Auth';

// function Logout() {
//     const [redirect, setRedirect] = useState(false)

//     useEffect (()=> {
//         axios.delete('http://localhost:5000/logout', {withCredentials:true})
//             .then(res => {
//                 Auth.logout()
//                 setRedirect(true)
//             })
//     }, [])

//     return ( 
//         <div className="container">
//             {redirect ?
//             <Redirect to="/login"/>
//             : null }
//         </div>
//     );
// }

// export default Logout;