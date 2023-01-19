<template>
  <main class="container">
    <div class="grid">
      <div>
    <form @submit.prevent="searchEmployee">
      <div class="grid">
        <input v-model="searchTerm" placeholder="Rechercher">
        <button type="submit">Rechercher</button>
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
      <button type="submit">Créer/Modifier</button>
    </form>
    </div>

    
    

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Salaire</th>
            <th>Niveau</th>
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
              <button @click="editEmployee(employee)">Modifier</button>
              <button @click="deleteEmployee(employee)">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
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
      const { data } = await axios.get('/api/rechercher?mode=all');
      this.employees = data;
    },
    async createOrUpdateEmployee() {
      if (this.employee.id) {
        await axios.put(`/api/modifier?id=${this.employee.id}`, this.employee);
      } else {
        await axios.post('/api/ajouter', this.employee);
      }
      this.employee = {
        id: '',
        name: '',
        lastname: '',
        salary: '',
        level: ''
      }
    }
  }
}
</script>