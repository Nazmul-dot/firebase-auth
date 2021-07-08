import React from 'react'
import MenuIcon from '@material-ui/icons/Menu';
import {Link, useHistory} from 'react-router-dom'
import firebase from 'firebase'
import {useDispatch} from 'react-redux'
const Navbar = () => {
    const dispatch = useDispatch()
    const history=useHistory();
    const logout=()=>{
        firebase.auth().signOut()
        dispatch({
            type:'LOGOUT',
            payload:null
        })
        history.push('/login')
    }
    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="container-fluid">
                    <Link class="navbar-brand" to="/">Navbar</Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"><MenuIcon/></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav ml-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <Link class="nav-link" to="/">Home</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/login">login</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/signup">SignUp</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link"  onClick={logout}>logout</Link>
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
