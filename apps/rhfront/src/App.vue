<template>
  <main class="container">
    <div class="grid">
      <div>
        <h1>RhTest</h1>
        
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
        <h2>Liste des salariés :</h2>
        <form>
          <div class="grid">
            <input v-model="searchTerm" type="search" id="search" name="search" placeholder="Rechercher" @keyup="search(searchTerm)">
          </div>
        </form>
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
                <button class="outline small-btn" @click="deleteEmployee(employee)">🗑️</button>
              </td>
            </tr>
          </tbody>
        </table>
        <h2>Administration</h2>
        <div class="admin">
            <button class="small-btn" @click="deleteAll()">🗑️ Supprimer les données</button>
            <button class="small-btn" @click="resetData()">↩ Restaurer les données de test</button>
        </div>
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
    async search(name) {
      if(!name.length) {
        return this.fetchEmployees();
      }
      const { data } = await axios.get(`http://localhost:8080/api/rechercher?name=${name}`);
      this.employees = [...data];
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
    },
    async deleteAll(employee) {
      await axios.delete('http://localhost:8080/api/deleteall');
      return this.fetchEmployees();
    },
    async resetData() {
      await axios.delete('http://localhost:8080/api/datatest');
      return this.fetchEmployees();
    }
  }
}
</script>

<style>
.small-btn {
  width: auto;
  display: inline;
  padding: 0.25rem 0.5rem;
  margin-bottom: 0;
  font-size: 0.75em;
}

.admin > button {
  margin: 0.25rem;
}
</style>