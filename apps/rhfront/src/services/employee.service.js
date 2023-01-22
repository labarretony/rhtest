import axios from "axios";

async function create(employee) {
  await axios.post(
    `http://localhost:8080/api/ajouter?id=${employee.id}&name=${employee.name}&lastname=${employee.lastname}&salary=${employee.salary}&level=${employee.level}`
  );
}

async function fetch() {
  const { data } = await axios.get(
    "http://localhost:8080/api/rechercher?mode=all"
  );
  return data;
}

async function search(name) {
  const { data } = await axios.get(
    `http://localhost:8080/api/rechercher?name=${name}`
  );
  return [...data];
}

async function update(employee) {
  await axios.post(
    `http://localhost:8080/api/modifier?id=${employee.id}&name=${employee.name}&lastname=${employee.lastname}&salary=${employee.salary}&level=${employee.level}`
  );
}

async function deleteOne(employee) {
  await axios.delete(`http://localhost:8080/api/supprimer?id=${employee.id}`);
}

async function deleteAll() {
  await axios.delete("http://localhost:8080/api/deleteall");
}

async function resetData() {
  await axios.delete("http://localhost:8080/api/datatest");
}

const emptyEmployee = {
  id: "",
  name: "",
  lastname: "",
  salary: "",
  level: "",
};

export { create, search, update, fetch, deleteAll, deleteOne, resetData, emptyEmployee };
