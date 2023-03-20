import axios from 'axios';

export default {
    getList: async function(page) {
    try {
      let url;
      if(page!=null & page > 1) {
        url ="https://reqres.in/api/users?per_page=5&page="+page;
      } else {
        url = "https://reqres.in/api/users?per_page=5";
      }
      const response = await axios.get(url);
      console.log(response.data);
      return response.data;
    } catch(error) {
      throw error;
    }
  }
}