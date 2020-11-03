import axios from "axios";

class DataService {
  baseURL = 'http://localhost:3000/';

  getAll() {
    return axios.get(this.baseURL + "clients");
  }

  get(id) {
    return axios.get(`${this.baseURL}clients/${id}`);
  }

  create(data) {
    return axios.post(this.baseURL + "clients", data);
  }

  update(id, data) {
    return axios.put(`${this.baseURL}clients/${id}`, data);
  }

  delete(id) {
    return axios.delete(`${this.baseURL}clients/${id}`);
  }

  deleteAll() {
    return axios.delete(this.baseURL + "clients");
  }

  findByTitle(title) {
    return axios.get(`${this.baseURL}clients?title=${title}`);
  }
}

export default new DataService();
