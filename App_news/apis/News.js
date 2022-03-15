//import axios from 'axios';

//export default axios.create({

//     baseURL: 'https://newsapi.org/v2/'

//})

import axios from 'axios';

const newAPI = axios.create({
  baseURL: 'https://newsapi.org/v2'
});

export default newAPI;