
// validating new room
export async function validateNewRoom(values) {
    const errors = {}
    if(!values.userName) {
        errors.userName = "Username required!!!"
    }
    else if(values.userName.length < 4) {
        errors.userName = "Username must be 4 or more characters!!!"
    }
    else if(values.userName.length >= 20) {
        errors.userName = "Username must be less than 20 characters!!!"
    }

    return errors
}

// validating existing room page
export async function validateExistRoom(values) {
    const errors = {}
    if(!values.userName) {
        errors.userName = "Username required!!!"
    }
    else if(values.userName.length < 4) {
        errors.userName = "Username must be 4 or more characters!!!"
    }
    else if(values.userName.length >= 20) {
        errors.userName = "Username must be less than 20 characters!!!"
    }

    return errors
}