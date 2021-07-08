import React from 'react'
import { TextField, Button } from '@material-ui/core'
import { useState } from 'react'
import { toast } from 'react-toastify';
import { auth } from '../../firebase'
const initial = {

    email: '',

}
const Register = () => {
    const [data, setdata] = useState(initial)
    const handlechange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setdata({ ...data, [name]: value })
    }
    // const { name, email, password } = data
    const sentEmailsubmit = async (e) => {
        e.preventDefault();
        // console.log(data)
        const config = {
            url: "http://localhost:3000/signup/complete",
            handleCodeInApp: true
        }

        await auth.sendSignInLinkToEmail(data.email, config)
        toast.success(
            `email is sent in ${data.email} address`
        )
        localStorage.setItem('getemailforregister', data.email)
        setdata(initial)
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
                                <div className='w-100'></div>
                                <div className='col-md-6 mx-auto m-3'>
                                    <TextField
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

export default Register
