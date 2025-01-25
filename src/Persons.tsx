import {Button, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import PersonRow from "./PersonRow.tsx";
import {usePersons} from "./queries/hooks.ts";
import {useNavigate} from "react-router";

function Persons() {
    const navigate = useNavigate();
    const persons = usePersons();

    if (persons.isLoading) {
        return <div>Loading...</div>;
    }

    if (persons.isError) {
        return <div>Error: {persons.error.message}</div>;
    }

    return (
        <div style={{width: "100%"}}>
            <Typography fontSize={25} className={"!m-6"}>Persons</Typography>
            <Button variant={"contained"} className={"!m-3"} onClick={() => navigate("/person/")}>Add Person</Button>
            <Table className={"!text-white w-10"}>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Street</TableCell>
                        <TableCell/>
                        <TableCell/>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {persons.data?.map((person) => (
                        <PersonRow key={person.id} person={person}/>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default Persons;