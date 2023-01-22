<template>
  <main class="container">
    <div class="grid">
      <div>
        <h1>RhTest</h1>

        <h2>Création d'un salarié :</h2>
        <Employee @created="createdEvent"/>
        <h2>Liste des salariés :</h2>
        <form>
          <div class="grid">
            <input v-model="searchTerm" type="search" id="search" name="search" placeholder="Rechercher"
              @keyup="search(searchTerm)">
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
                <button class="outline small-btn" @click="toggleUpdate(employee)">📝</button>
                <button class="outline small-btn" @click="deleteEmployee(employee)">🗑️</button>
              </td>
            </tr>
          </tbody>
        </table>

        <Employee v-if="updateMode" :id="employee.id" :name="employee.name" :lastname="employee.lastname"
          :salary="employee.salary" :level="employee.level" @updated="updateEmployee" />

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
import Employee from './components/Employee.vue';
import {fetch, search, create, update, deleteOne, deleteAll, resetData, emptyEmployee} from './services/employee.service';

export default {
  data() {
    return {
      employee: emptyEmployee,
      employees: [],
      searchTerm: "",
      updateMode: false,
    };
  },
  components: { Employee },
  mounted() {
    this.fetchEmployees();
  },
  methods: {
    async fetchEmployees() {
      this.employees = await fetch();
    },
    async search(name) {
      if (!name.length) {
        return this.fetchEmployees();
      }
      this.employees = await search(name);
    },
    async createdEvent(employee) {
      await create(employee);
      this.employee = emptyEmployee;
      return this.fetchEmployees();
    },
    toggleUpdate(employee) {
      this.updateMode = !this.updateMode;
      if(this.updateMode) {
        this.employee = employee;
      } else {
        this.employee = emptyEmployee;
      }
    },
    async updateEmployee(employee) {
      await update(employee);
      this.employee = emptyEmployee;
      this.updateMode = false;
      return this.fetchEmployees();
    },
    async deleteEmployee(employee) {
      await deleteOne(employee);
      this.employee = emptyEmployee;
      return this.fetchEmployees();
    },
    async deleteAll(employee) {
      await deleteAll()
      return this.fetchEmployees();
    },
    async resetData() {
      await resetData();
      return this.fetchEmployees();
    }
  },
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

.admin>button {
  margin: 0.25rem;
}
</style>