<template>
  <main class="container">
    <div class="grid">
      <div>
        <h1>RhTest</h1>
        <form>
          <div class="grid">
            <input v-model="searchTerm" placeholder="Rechercher">
            <button @click="search(searchTerm)">Rechercher</button>
          </div>
        </form>
        <form @submit.prevent="createOrUpdateEmployee">
          <label>Matricule: <input v-model="employee.id" placeholder="ID"></label>
          <div class="grid">
            <label>Nom: <input v-model="employee.name" placeholder="Nom"></label>
            <label>Prénom: <input v-model="employee.lastname" placeholder="Prénom"></label>
          </div>
          <div class="grid">
            <label>Evolution: <input v-model="employee.level" placeholder="Niveau"></label>
            <label>Salaire: <input v-model="employee.salary" placeholder="Salaire"></label>
          </div>
          <div class="grid">
            <button @click="createEmployee(employee)">Créer</button>
            <button @click="updateEmployee(employee)">Modifier</button>
          </div>
        </form>
      </div>
      <div>
        <h2>Liste des salariés :</h2>
        <table>
          <thead>
            <tr>
              <th>Matricule</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Salaire</th>
              <th>Evolution</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="employee in employees" :key="employee.id">
              <td>{{ employee.id }}</td>
              <td>{{ employee.name }}</td>
              <td>{{ employee.lastname }}</td>
              <td>{{ employee.salary }}</td>
              <td>{{ employee.level }}</td>
              <td>
                <button @click="deleteEmployee(employee)">X</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      employee: {
        id: '',
        name: '',
        lastname: '',
        salary: '',
        level: '',
        time: 0,
      },
      employees: [],
      searchTerm: '',
    };
  },
  mounted() {
    this.fetchEmployees();
  },
  methods: {
    async fetchEmployees() {
      const { data } = await axios.get('http://localhost:8080/api/rechercher?mode=all');
      this.employees = data;
    },
    async createOrUpdateEmployee() {
      if (this.employee.id) {
        await axios.put(`http://localhost:8080/api/modifier?id=${this.employee.id}`, this.employee);
      } else {
        await axios.post('http://localhost:8080/api/ajouter', this.employee);
      }
      this.employee = {
        id: '',
        name: '',
        lastname: '',
        salary: '',
        level: ''
      }
    },
    async createEmployee(employee) {
      await axios.post(`http://localhost:8080/api/ajouter?id=${employee.id}&name=${employee.name}&lastname=${employee.lastname}&salary=${employee.salary}&level=${employee.level}`);
      this.employee = {
        id: '',
        name: '',
        lastname: '',
        salary: '',
        level: ''
      }
      return this.fetchEmployees();
    },
    async updateEmployee(employee) {
      await axios.post(`http://localhost:8080/api/modifier?id=${employee.id}&name=${employee.name}&lastname=${employee.lastname}&salary=${employee.salary}&level=${employee.level}`);
      this.employee = {
        id: '',
        name: '',
        lastname: '',
        salary: '',
        level: ''
      }
      return this.fetchEmployees();
    },
    async deleteEmployee(employee) {
      await axios.delete(`http://localhost:8080/api/supprimer?id=${employee.id}`);
      this.employee = {
        id: '',
        name: '',
        lastname: '',
        salary: '',
        level: ''
      }
      return this.fetchEmployees();
    }
  }
}
</script>
