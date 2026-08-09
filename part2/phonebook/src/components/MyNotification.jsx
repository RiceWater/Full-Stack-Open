const MyNotification = ({message}) => {
  return message === '' ? (<></>) : (
    <div className='notifContainer'>
      <h3 className='notif'>{message}</h3>
    </div>
  )
}

export default MyNotification;