import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/users'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState({})
  
  useEffect(() => {
    const fetchStoredUser = async () => {
      const sessionUsername = window.localStorage.getItem("sessionUsername")
      const sessionToken = window.localStorage.getItem("sessionToken")
      const sessionName = window.localStorage.getItem("sessionName")
      if (sessionName && sessionToken && sessionUsername) {
        setUser({token: sessionToken, username: sessionUsername, name: sessionName})
      }
      
    }
    fetchStoredUser()
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, []) 

  const handleUsername = (event) => {
    setUsername(event.target.value)
  }

  const handlePassword = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    const credentials = {
      username: username,
      password: password
    }
    const user = await loginService.performLogin(credentials)
    setUser(user)
    window.localStorage.setItem("sessionUsername", user.username)
    window.localStorage.setItem("sessionToken", user.token)
    window.localStorage.setItem("sessionName", user.name)
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem("sessionUsername")
    window.localStorage.removeItem("sessionToken")
    window.localStorage.removeItem("sessionName")
    setUser({})
  }

  if (Object.keys(user).length === 0) {
    return <LoginForm handleUsername={handleUsername} handlePassword={handlePassword} handleLogin={handleLogin} />
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <span>{user.name} logged in</span>
        <button onClick={handleLogout}>log out</button>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }
}

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

export default App