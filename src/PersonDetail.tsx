import { useCreatePerson, usePerson, useUpdatePerson } from "./queries/hooks.ts";
import {useNavigate, useParams} from "react-router";
import { Button, InputLabel, TextField, Typography } from "@mui/material";
import { Person } from "./queries/types.ts";
import React, { useEffect, useState } from "react";

function PersonDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const personDetailsQuery = usePerson(id!);
    const addPersonQuery = useCreatePerson();
    const updatePersonQuery = useUpdatePerson();

    const [formData, setFormData] = useState<Person | null>(null);

    useEffect(() => {
        if (personDetailsQuery.data) {
            setFormData(personDetailsQuery.data);
        }
    }, [personDetailsQuery.data]);

    if (personDetailsQuery.isLoading) {
        return <div>Loading...</div>;
    }

    if (personDetailsQuery.isError) {
        return <div>Error: {personDetailsQuery.error.message}</div>;
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name.startsWith('address.')) {
            const fieldName = name.split('.')[1];
            setFormData((prev) => ({
                ...prev!,
                address: {
                    ...prev!.address,
                    [fieldName]: value,
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev!,
                [name]: value,
            }));
        }
    };

    function handleSubmit() {
        if (id) {
            updatePersonQuery.mutate(formData!);
            navigate("/");
        } else {
            addPersonQuery.mutate(formData!);
            navigate("/");
        }
    }

    return (
        <div>
            <Typography fontSize={25} className={"!m-6"}>{id ? "Update" : "Add"} Person</Typography>
            <TextField
                label={"Name"}
                className={"!m-2 !mb-3"}
                name="name"
                value={formData?.name || ""}
                onChange={handleInputChange}
            />
            <TextField
                label={"Email"}
                className={"!m-2 !mb-3"}
                name="email"
                value={formData?.email || ""}
                onChange={handleInputChange}
            />
            <TextField
                label={"Phone"}
                className={"!m-2 !mb-3"}
                name="phone"
                value={formData?.phone || ""}
                onChange={handleInputChange}
            />
            <InputLabel className={"m-5 ml-3"}>Address</InputLabel>
            <TextField
                label={"Street"}
                className={"!m-2 !mb-3"}
                name="address.street"
                value={formData?.address?.street || ""}
                onChange={handleInputChange}
            />
            <TextField
                label={"City"}
                className={"!m-2 !mb-3"}
                name="address.city"
                value={formData?.address?.city || ""}
                onChange={handleInputChange}
            />
            <TextField
                label={"Zip"}
                className={"!m-2 !mb-3"}
                name="address.zip"
                value={formData?.address?.zip || ""}
                onChange={handleInputChange}
            />
            <TextField
                label={"State"}
                className={"!m-2 !mb-3"}
                name="address.state"
                value={formData?.address?.state || ""}
                onChange={handleInputChange}
            />
            <Button
                variant={"outlined"}
                type={"submit"}
                className={"!block !m-2"}
                onClick={handleSubmit}
            >
                Save
            </Button>
        </div>
    );
}

export default PersonDetail;