import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleUsername = (event) => {
    console.log(event.target.value)
    setUsername(event.target.value)
  }

  const handlePassword = (event) => {
    console.log(event.target.value)
    setPassword(event.target.value)
  }

  if (isLoggedIn) {
    return <LoginForm handleUsername={handleUsername} handlePassword={handlePassword} />
  } else {
    return (
      <div>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }
}

const LoginForm = ({handleUsername, handlePassword}) => {
    return (
      <>
        <h2>login to application</h2>
        <form>
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
        </form>
      </>
    )
}

export default App