import api from "../Axios/api"


export const allUsers = async () => {
    const users = api.get('/users?limit=10&page=1');
    console.log(users);
}