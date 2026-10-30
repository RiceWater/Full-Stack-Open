import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateForm from './components/CreateForm'
import blogService from './services/blogs'
import loginService from './services/users'
import NotificationAlert from './components/NotificationAlert'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState({})
  const [notificationMessage, setNotificationMessage] = useState("")
  const [isNotificationMessageError, setIsNotificationMessageError] = useState(false)

  useEffect(() => {
    const fetchStoredUser = async () => {
      const sessionUsername = window.localStorage.getItem("sessionUsername")
      const sessionToken = window.localStorage.getItem("sessionToken")
      const sessionName = window.localStorage.getItem("sessionName")
      if (sessionName && sessionToken && sessionUsername) {
        setUser({token: sessionToken, username: sessionUsername, name: sessionName})
      }
    }

    const getBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }

    fetchStoredUser()
    getBlogs()
  }, []) 

  useEffect(() => {
    if (notificationMessage.length === 0) {
      return
    }
    setTimeout(() => {
      setNotificationMessage("")
      setIsNotificationMessageError(false)
    }, 2000)
  }, [notificationMessage])

  const handleUsername = (event) => {
    setUsername(event.target.value)
  }

  const handlePassword = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = async (event) => {
    try {
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
    } catch (error) {
      setIsNotificationMessageError(true)  
      setNotificationMessage(error.response.data.error) 
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem("sessionUsername")
    window.localStorage.removeItem("sessionToken")
    window.localStorage.removeItem("sessionName")
    setUser({})
  }

  if (Object.keys(user).length === 0) {
    return <LoginForm notificationMessage={notificationMessage} isNotificationMessageError={isNotificationMessageError} handleUsername={handleUsername} handlePassword={handlePassword} handleLogin={handleLogin} />
  } else {
    return (
      <div>
        <h2>blogs</h2>
        {
          notificationMessage.length !== 0 && 
          <NotificationAlert message={notificationMessage} isError={isNotificationMessageError}/>
        }
        <span>{user.name} logged in</span>
        <button onClick={handleLogout}>log out</button>
        <CreateForm sessionToken={user.token} setBlogs={setBlogs} setNotificationMessage={setNotificationMessage}/>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }
}

export default App