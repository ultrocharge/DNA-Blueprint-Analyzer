export const getTokenValid = (token:any) => {
    if (!token) return false;
   
    //In JavaScript, a time stamp is the number of milliseconds that have passed since January 1, 1970
    const jwtExpireTimestamp = JSON.parse(atob(token.split(".")[1])).exp;

    //In this case, since the exp value is in seconds format, we need to convert it to milliseconds format in the next step. 
    
    const jwtExpireDateTime = new Date(jwtExpireTimestamp * 1000);
    //Now we have expiration date of the token 
   
    if (jwtExpireDateTime < new Date()) {
        console.log("API token expired");
        localStorage.removeItem('token');
        
        return false;
    }
   
    return true;
};