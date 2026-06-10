export const isSafe = (password) => {
    if( password.length >= 12 && password.length <= 18){
        return false;
    } else if(password.length >= 6){
        return true;
    }
}
