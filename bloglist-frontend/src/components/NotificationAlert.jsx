const NotificationAlert = ({ message, isError }) => {
  const notificationStyle = {
    backgroundColor: "#6f6c6c",
    borderRadius: "10px",
    padding: "10px"
  }
  
  const successStyle = {
    ...notificationStyle,
    borderColor: "#7ec352",
    color: "#7ec352"
  }

  const errorStyle = {
    ...notificationStyle,
    borderColor: "#7a2c2c",
    color: "#7a2c2c"
  }
  return (
    <div>
      <p style={isError ? errorStyle : successStyle}>{message}</p>
    </div>
  )
}

export default NotificationAlert