import axios from "axios";

class PotentialClientTrackerApi {
  static async login(data) {
    return await axios.post("/auth/login", data);
  }

  static async logout() {
    return await axios.post("/auth/logout");
  }

  static async register(data) {
    return await axios.post("/auth/register", data);
  }

  static async getAllClients() {
    return await axios.get("/clients");
  }

  static async getClient(id) {
    return await axios.get(`/clients/${id}`);
  }

  static async addClient(data) {
    return await axios.post("/clients", data);
  }

  static async updateClient(id, data) {
    return await axios.patch(`/clients/${id}`, data);
  }

  static async deleteClient(id) {
    return await axios.delete(`/clients/${id}`);
  }

  static async addStatus(data) {
    return await axios.post("/status", data);
  }

  static async deleteStatus(id) {
    return await axios.delete(`/status/${id}`);
  }

  static async getUser(id) {
    return await axios.get(`/users/${id}`);
  }
}

export default PotentialClientTrackerApi;
