const LoginForm = ({handleUsername, handlePassword, handleLogin}) => {
  return (
    <>
      <h2>login to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input id="username" title="username" onChange={handleUsername}/>
          </label>
        </div>
        <div>
          <label>
            password
            <input id="password" title="password" onChange={handlePassword}/>
          </label>
        </div>
        <button type="submit">log in</button>
      </form>
    </>
  )
}

export default LoginForm 