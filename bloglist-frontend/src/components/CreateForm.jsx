import { useState } from "react"
import blogService from './../services/blogs'
 
const CreateForm = ({sessionToken, setBlogs}) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    const blogRequest = {
      title: title,
      author: author,
      url: url
    }
    await blogService.createBlog({sessionToken: sessionToken, blog: blogRequest})
    setTitle("")
    setAuthor("")
    setUrl("")
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }
  
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          <label>
            title:
            <input id='title' title='title' value={title} onChange={handleTitleChange}/>
          </label>
        </div>
        <div>
          <label>
            author:
            <input id='author' title='author' value={author} onChange={handleAuthorChange}/>
          </label>
        </div>
        <div>
          <label>
            url:
            <input id='url' title='url' value={url} onChange={handleUrlChange}/>
          </label>
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default CreateForm