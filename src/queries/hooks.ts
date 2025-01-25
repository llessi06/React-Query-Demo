import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {createPerson, deletePerson, fetchPerson, fetchPersons, updatePerson} from "./personQueries.ts";
import {Person} from "./types.ts";

const PERSONS_QUERY_KEY = ["persons"];
const PERSON_QUERY_KEY = (id: string) => ["person", id];


export const usePersons = () => {
    return useQuery({
        queryKey: PERSONS_QUERY_KEY,
        queryFn: fetchPersons,
    });
};

export const usePerson = (id: string) => {
    return useQuery({
        queryKey: PERSON_QUERY_KEY(id),
        queryFn: () => fetchPerson(id),
        enabled: !!id,
    });
};

export const useCreatePerson = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (person: Person) => createPerson(person),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: PERSONS_QUERY_KEY});
        },
    });
};

export const useUpdatePerson = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (person: Person) => updatePerson(person),
        onSuccess: (updatedPerson) => {
            queryClient.invalidateQueries({queryKey: PERSONS_QUERY_KEY});
            queryClient.invalidateQueries({queryKey: PERSON_QUERY_KEY(updatedPerson.id)});
        },
    });
};

export const useDeletePerson = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deletePerson(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: PERSONS_QUERY_KEY});
        },
    });
};



