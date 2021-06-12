module.exports.validationRegisterInput = (
    username,
    email,
    password,
    confirmPassword
) => {
    const errors ={};
    if(username.trim() === ''){
        errors.username = 'username must not be empty';
    }
    if(email.trim() === ''){
        errors.email = 'email must not be empty';
    }else{
      //  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      //  if(!email.match(re)){
      //      errors.email = 'email format is not valid'
       // }
    }
    if(password === ''){
        errors.password = 'password must not be empty';
    } 
  //  if(password !== confirmPassword){
 //       errors.confirmPassword = 'confirm password must be same as password';
  //  }

    return{
        errors,
        valid: Object.keys(errors).length < 1
    }
}

module.exports.validateLoginInput = (username, password) =>{
    const errors ={};
    if(username.trim() === ''){
        errors.username = 'username must not be empty';
    }
    if(password.trim() === ''){
        errors.password = 'password must not be empty';
    } 
    return{
        errors,
        valid: Object.keys(errors).length < 1
    }   
}