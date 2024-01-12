const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    switch (message.type) {
        case 'success':
            return (<div className='success'> {message.text} </div>)
        case 'error':
            return (<div className='error'> {message.text} </div>)
        default:
            return null
    }
}

export default Notification