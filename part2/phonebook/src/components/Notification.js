const Notification = ({ message }) => {

    const baseStyle = {
        background: 'lightgrey', 
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10 
      
    }

    const successStyle = {
        ...baseStyle, color: 'green'
    }
    const errorStyle = {
        ...baseStyle, color: 'red'
    }

    const styleType = 
    message.type === 'success'
    ? successStyle 
    : errorStyle

 
    if (!message.type) { 
        return null 
    }

    return(
        <div style={styleType}>
            {message.text}
        </div>
    )
}

export default Notification