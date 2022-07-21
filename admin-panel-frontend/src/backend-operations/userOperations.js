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
            resolve(response.data)
          })
          .catch(function (error) {
            reject(error)
          });
          
    })
}

export const getAllUsers = () => {
    return new Promise ((resolve, reject) => {
        
    var config = {
        method: 'get',
        url: '/users',
        headers: { }
    };
    
    axios(config)
    .then(function (response) {
        resolve(response);
    })
    .catch(function (error) {
        reject(error);
    });
  
    })
}

export const signIn = (credentials) => {
    return new Promise((resolve, reject) => {
        var data = JSON.stringify({
            "email": credentials.email,
            "password": credentials.password
          });
          
          var config = {
            method: 'post',
            url: '/signin',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
            console.log(response.data)
            resolve(response.data)
          })
          .catch(function (error) {
            reject(error);
          });
          
    })
}

export const getSpecificUserInformation = (id) => {
    return new Promise ((resolve, reject) => {
        console.log(id)
        var config = {
            method: 'get',
            url: '/getUserById/' + id,
            headers: { }
          };
          
          axios(config)
          .then(function (response) {
            resolve(response.data)
          })
          .catch(function (error) {
            reject(error);
          });
          
    })
}

export const updateUser = (values) => {
    return new Promise((resolve, reject) => {
        var data = JSON.stringify({
            "id": values.id,
            "name": values.name,
            "age": values.age,
            "mobile": values.mobile,
            "role": values.role
          });
          
          var config = {
            method: 'post',
            url: '/updateUser',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
            resolve(response)
          })
          .catch(function (error) {
            reject(error)
          });
          
    })
}

export const setActiveUser = (id, isActive) => {
    return new Promise ((resolve, reject) => {
        var data = JSON.stringify({
            "id": id,
            "active": isActive
          });
          
          var config = {
            method: 'post',
            url: '/setActive',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
            resolve(response.data)
          })
          .catch(function (error) {
            reject(error)
          });
          
    })
}

export const sendPhoto = (file) => {
    const data = new FormData();
    data.append("avatar", file);

    axios.post("/imageupload", data, {
        headers: {"Content-Type": "multipart/form-data"}
    })
    .then((result) => {
        console.log(result);
    })
    .catch((err)=> {
        console.log(err)
    })

}