import type {Person} from "./queries/types.ts";
import {Button, TableCell, TableRow} from "@mui/material";
import {useDeletePerson} from "./queries/hooks.ts";
import {useNavigate} from "react-router";

interface PersonRowProps {
    person: Person;
}

function PersonRow(props: PersonRowProps) {
    const navigate = useNavigate();
    const deletePerson = useDeletePerson();

    function handleDeletePerson() {
        deletePerson.mutate(props.person.id);
    }

    function handleEditPerson() {
        navigate(`/person/${props.person.id}`);
    }

    return <TableRow>
        <TableCell>{props.person.id}</TableCell>
        <TableCell>{props.person.name}</TableCell>
        <TableCell>{props.person.email}</TableCell>
        <TableCell>{props.person.phone}</TableCell>
        <TableCell>{props.person.address.street}</TableCell>
        <TableCell>
            <Button onClick={handleEditPerson}>Edit</Button>
        </TableCell>
        <TableCell>
            <Button onClick={handleDeletePerson}>Delete</Button>
        </TableCell>
    </TableRow>;
}

export default PersonRow;