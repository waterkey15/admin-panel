import axios from '../axios/axios'



export const addUserBackend = (values) => {
    return new Promise ((resolve, reject) => {
        var isActive;
        if(values.switch === undefined || values.switch === false){
            isActive = 0;
        }else{
            isActive = 1;
        }
        var data = JSON.stringify({
            "name": values.username,
            "age": values.age,
            "mobile": values.mobile,
            "email": values.email,
            "password": values.password,
            "active": isActive,
            "role": values.role
          });
          
          var config = {
            method: 'post',
            url: '/addUser',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
          
    })
}

