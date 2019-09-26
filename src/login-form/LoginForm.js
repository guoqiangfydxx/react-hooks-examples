import React, { useState } from 'react'
import useForm from 'react-hook-form'
import './index.css'

function LoginForm () {
  const [username, setUsername] = useState('')
  const { register, handleSubmit, errors } = useForm(); 

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }
  const onSubmit = data => {
    console.log(data);
  };

  return (
    <div className='loginForm'>
      <h3>Please login:</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder='username'
          onChange={handleUsernameChange}
          ref={register}
          name='username'
          value={username}
        />
        <input
          type='password'
          placeholder='password'
          // onChange={handlePasswordChange}
          ref={register({
            required: true
          })}
          name='password'
        />
        {errors.password && 'password is required.'}

        <input type='submit' />
      </form>
      
    </div>
  )
}

export default LoginForm
