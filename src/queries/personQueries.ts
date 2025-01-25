import api from "./api.ts";
import {Person} from "./types.ts";

async function fetchPersons() {
    const {data} = await api.get<Person[]>("/person");
    return data;
}

async function fetchPerson(id: string) {
    const {data} = await api.get<Person>(`/person/${id}`);
    return data;
}

async function createPerson(person: Person) {
    const {data} = await api.post<Person>("/person", person);
    return data;
}

async function updatePerson(person: Person) {
    const {data} = await api.put<Person>(`/person/${person.id}`, person);
    return data;
}

async function deletePerson(id: string) {
    await api.delete(`/person/${id}`);
}

export {
    fetchPersons, fetchPerson, createPerson, updatePerson, deletePerson
};