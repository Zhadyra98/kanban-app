import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom'

function LoginPage() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function loginUser(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if(login && password){
            const response = await fetch('https://hidden-chamber-35395.herokuapp.com/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    //'x-access-token': localStorage.getItem('token'),
                },
                body: JSON.stringify({
                    login,
                    password,
                }),
            })
            const data = await response.json()
            if(response.ok) {
                console.log(data.token)
                localStorage.setItem('token', data.token)
                navigate("/");
            }else{
                console.log(data.errors)
            }
        }
        else console.log('Enter you email and password')
    }
    return (
        <div className='container'>
            <div className="row justify-content-center align-items-center">
                <div className="col-9 col-xs-8 col-sm-7 col-md-6 col-lg-4 text-center">
                    <h1 className='h2 mb-3 font-weight-normal'>Login</h1>
                    <form onSubmit={loginUser}>
                        <input
                            className="form-control mb-2"
                            placeholder='Your Login'
                            value={login}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLogin(e.target.value)}
                            type="text"
                            autoFocus
                        />
                        <input
                            className='form-control mb-2'
                            placeholder='Password'
                            value={password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            type="password"
                            autoFocus
                        />
                        <div className="my-3">
                            <input className='btn btn-success btn-lg w-100' type="submit" value="Sign In"/>
                        </div>
                        <a href="/register" className="link-success">Register</a>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;