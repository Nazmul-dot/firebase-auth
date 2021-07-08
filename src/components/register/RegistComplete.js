import React,{useEffect} from 'react'
import { TextField, Button } from '@material-ui/core'
import { useState } from 'react'
import { toast } from 'react-toastify';
import {auth} from '../../firebase'
const initial = {
    name: '',
    email: '',
    password: '',
}
const RegistComplete = () => {
    const [data, setdata] = useState(initial)
    useEffect(()=>{
        const email=localStorage.getItem('getemailforregister');
        // console.log(window.location.href)
        setdata({...data,['email']:localStorage.getItem('getemailforregister')})
    },[])
    const handlechange = (e) => {
        const name=e.target.name;
        const value=e.target.value;
        setdata({ ...data, [name]: value })
    }
    // const { name, email, password } = data
    const sentEmailsubmit = async(e) => {
        e.preventDefault();
        // console.log(data)
       try {
           const result=await auth.signInWithEmailLink(
               data.email,
               window.location.href
           );
           console.log(result)
           if(result.user.emailVerified){
               localStorage.removeItem('getemailforregister')
               let user=auth.currentUser;
               await user.updatePassword(data.password)
               const idTokenResult=await user.getIdTokenResult()
               console.log('user',user,'token',idTokenResult)
           }
       } catch (error) {
           console.log(error)
       }
    }
    return (
        <>
            <div className='container-fluid' id='register'>
                <div className='row'>
                    <div className='col-md-10 border mx-auto m-3 d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
                        <div className='border-2 w-full'>
                            <form className='row '>
                                <div className='col-12 mx-auto '>
                                    <h2 className='text-center overflow-hidden'>SingUp</h2>
                                </div>
                                <div className='col-md-5 mx-auto m-3'>
                                    <TextField
                                        
                                        name='name'
                                        value={data.name}
                                        onChange={handlechange}
                                        variant='standard'
                                        fullWidth
                                        size='small'
                                        placeholder='Name'
                                        type='text'
                                    />
                                </div>
                                <div className='w-100'></div>
                                <div className='col-md-5 mx-auto m-3'>
                                    <TextField
                                        disabled
                                        name='email'
                                        value={data.email}
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
                                        value={data.password}
                                        onChange={handlechange}
                                        variant='standard'
                                        fullWidth
                                        size='small'
                                        type='password'
                                    />
                                </div>
                                <div className='w-100'></div>
                                <div className='row col-md-5 mx-auto m-3'>
                                    <div className='col-md-6 mx-auto '>
                                        <a href="#login">Already an account?signIn.</a>
                                    </div>
                                </div>
                                <div className='w-100'></div>
                                <div className='col-md-5 mx-auto m-2'>
                                    <Button onClick={sentEmailsubmit} variant='contained' color='primary' fullWidth>
                                        regist
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

export default RegistComplete
