const MyNotification = ({message, isError}) => {
  return message === '' ? (<></>) : (
    <div className={'notifContainer ' + (isError ? 'errorNotifContainer' : 'successNotifContainer')}>
      <h3 className={'notif ' + (isError ? 'errorNotif' : 'notif')}>{message}</h3>
    </div>
  )
}

export default MyNotification;