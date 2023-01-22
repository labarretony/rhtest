<template>
  <h3 v-if="!creation">Mise à jour de l'employé {{ employee.id }}</h3>
  <form @submit.prevent="submit">
    <label>Matricule: <input v-model="employee.id" placeholder="ID"></label>
    <div class="grid">
      <label>Nom: <input v-model="employee.name" placeholder="Nom"></label>
      <label>Prénom: <input v-model="employee.lastname" placeholder="Prénom"></label>
    </div>
    <div class="grid">
      <label>Niveau: <input v-model="employee.level" placeholder="Niveau"></label>
      <label>Salaire: <input v-model="employee.salary" placeholder="Salaire"></label>
    </div>
    <div class="grid">
      <button v-if="creation">Créer</button>
      <button v-if="!creation">Modifier</button>
    </div>
  </form>
</template>

<script setup>
 import { defineEmits,ref } from 'vue'
 import { emptyEmployee } from '../services/employee.service'

const props = defineProps({
  id: String,
  name: String,
  lastname: String,
  level: String,
  salary: String,
})

const emit = defineEmits(['created', 'updated'])

const creation = !props.id?.length

let employee = creation ? {
  id: "",
  name: "",
  lastname: "",
  level: "",
  salary: ""
} : {
  id: props.id,
  name: props.name,
  lastname: props.lastname,
  level: props.level,
  salary: props.salary,
}

const submit = () => {
  emit(creation ? "created": "updated", employee);
  employee = emptyEmployee;
}

</script>