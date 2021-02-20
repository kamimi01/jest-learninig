// users.js
import axios from 'axios';

class Users {
  static all() {
    // GETリクエストを投げる
    return axios.get('/users.json').then(resp => resp.data);
  }
}

export default Users;