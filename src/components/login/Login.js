import React from 'react'
import { TextField, Button } from '@material-ui/core'
import { auth } from '../../firebase'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { provider, FBprovider } from '../../firebase'
const initial = {
    email: '',
    password: ''
}
const Login = () => {
    // const googleAuthProvider = new firebase.auth.googleAuthProvider();
    const dispatch = useDispatch()
    const history = useHistory()
    const [data, setdata] = useState(initial)
    const handlechange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setdata({ ...data, [name]: value })
    }
    const { email, password } = data;
    const submit = async (e) => {
        e.preventDefault();
        // console.log(data)
        try {
            const result = await auth.signInWithEmailAndPassword(email, password)
            const { user } = result;
            const idTokenResult = await user.getIdTokenResult();
            console.log(user)
            dispatch({
                type: 'LOGED_IN_USER',
                payload: {
                    name: user.name,
                    email: user.email,
                    token: idTokenResult.token
                }
            })
            setdata(initial)
            history.push('/')
        } catch (error) {
            toast.error(error.message)
        }

    }
    const googlesubmit = async () => {
        try {
            const result = await auth.signInWithPopup(provider)
            const { user } = result;
            const idTokenResult = await user.getIdTokenResult();
            console.log(user)
            dispatch({
                type: 'LOGED_IN_USER',
                payload: {
                    name: user.name,
                    email: user.email,
                    token: idTokenResult.token
                }
            })
            setdata(initial)
            history.push('/')
        } catch (error) {
            toast.error(error.message)
        }
    }

    const Facebooksubmit = async () => {
        try {
            
            //firebase giye facebook enable kore development.facebook.com theke id and secret boshate hoi
            // shate firebase theke 3rd option theke link niye development.facebook.com er facebook login
            // er setting giye Valid OAuth Redirect URIs boshate hoi
            const result = await auth.signInWithPopup(FBprovider)
            const { user } = result;
            const idTokenResult = await user.getIdTokenResult();
            console.log(user)
            dispatch({
                type: 'LOGED_IN_USER',
                payload: {
                    name: user.name,
                    email: user.email,
                    token: idTokenResult.token
                }
            })
            setdata(initial)
            history.push('/')
        } catch (error) {
            toast.error(error.message)
        }
    }
    return (
        <>
            <div className='container-fluid' id='login'>
                <div className='row'>
                    <div className=' border col-md-10 mx-auto m-3 d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>

                        <div className='border w-full'>
                            <form className='row  '>
                                <div className='col-12 mx-auto'>
                                    <h2 className='text-center overflow-hidden'>SingIn</h2>
                                </div>
                                <div className='col-md-5 mx-auto m-3'>
                                    <TextField
                                        name='email'
                                        value={email}
                                        onChange={handlechange}
                                        variant='standard'
                                        fullWidth
                                        size='small'
                                        placeholder='email'
                                        type='email'
                                    />
                                </div>
                                <div className='w-100'></div>
                                <div className='col-md-5 mx-auto m-3'>
                                    <TextField
                                        name='password'
                                        value={password}
                                        onChange={handlechange}
                                        variant='standard'
                                        fullWidth
                                        size='small'
                                        type='password'
                                    />
                                </div>
                                <div className='w-100'></div>
                                <div className='row col-md-5 mx-auto m-3'>
                                    <div className='col-md-6 '>
                                        <a href="">Forget password</a>

                                    </div>
                                    <div className='col-md-6 '>
                                        <a href="#register">haven't an account?signUp.</a>

                                    </div>
                                </div>
                                <div className='w-100'></div>
                                <div className='col-md-5 mx-auto m-2'>
                                    <Button onClick={submit} variant='contained' color='primary' fullWidth>
                                        login
                                    </Button>
                                </div>
                                <div className='w-100'></div>
                                <div className='col-md-5 mx-auto m-2'>
                                    <Button onClick={googlesubmit} variant='contained' color='secondary' fullWidth>
                                        google
                                    </Button>
                                </div>
                                <div className='w-100'></div>
                                <div className='col-md-5 mx-auto m-2'>
                                    <Button onClick={Facebooksubmit} variant='contained' color='secondary' fullWidth>
                                        facebook
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
