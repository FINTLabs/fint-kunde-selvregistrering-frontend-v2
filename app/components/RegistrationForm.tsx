import { useActionData } from "@remix-run/react";
import { useState } from "react";
import {Button, HStack, VStack, TextField, Page } from "@navikt/ds-react";
import {PersonvernModal} from "~/components/PersonvernModal";

type ActionData = {
    formError?: string;
    fieldErrors?: {
        nin?: string;
        firstName?: string;
        lastName?: string;
        mail?: string;
        mobile?: string;
    };
    fields?: {
        nin: string;
        firstName: string;
        lastName: string;
        mail: string;
        mobile: string;
    };
};

type Errors = {
    nin?: string;
    firstName?: string;
    lastName?: string;
    mail?: string;
    mobile?: string;
};

export default function RegistrationForm() {
    const actionData = useActionData<ActionData>();
    const [errors, setErrors] = useState<Errors>({});

    const [formValues, setFormValues] = useState({
        nin: "",
        firstName: "",
        lastName: "",
        mail: "",
        mobile: "",
    });

    const handleSubmit = ()=> {
        console.log("Hello World");

        const newErrors: Errors = {};

            if (formValues.nin.length < 11) {
                newErrors.nin = "fult fødselsnummer er påkrevd.";
            }
            if (formValues.firstName.length == 0) {
                newErrors.firstName = "Fornavn er påkrevd.";
            }
            if (!formValues.lastName) {
                newErrors.lastName = "Etternavn er påkrevd.";
            }
            if (!formValues.mail) {
                newErrors.mail = "E-post adresse er påkrevd.";
            }
            if (!formValues.mobile) {
                newErrors.mobile = "telefonnummer er påkrevd.";
            }
            else if (formValues.mobile.length < 8) newErrors.mobile = "Mobilnummer må være minst 8 siffer langt.";

            else {
                console.log(formValues)
                // This is where the api post will go
            }
            setErrors(newErrors);
        };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    return (
            <Page.Block gutters width="md">
                <VStack gap="4" marginInline="20">
                    <TextField
                        type="number"
                        name="nin"
                        label="Fødselsnummer"
                        value={formValues.nin}
                        onChange={handleChange}
                        error={errors.nin}
                    />
                    {actionData?.fieldErrors?.nin && <p>{actionData.fieldErrors.nin}</p>}

                    <TextField
                        type="text"
                        name="firstName"
                        label="Fornavn"
                        value={formValues.firstName}
                        onChange={handleChange}
                        error={errors.firstName}
                    />
                    {actionData?.fieldErrors?.firstName && <p>{actionData.fieldErrors.firstName}</p>}

                    <TextField
                        type="text"
                        name="lastName"
                        label="Etternavn"
                        value={formValues.lastName}
                        onChange={handleChange}
                        error={errors.lastName}
                    />
                    {actionData?.fieldErrors?.lastName && <p>{actionData.fieldErrors.lastName}</p>}

                    <TextField
                        type="email"
                        name="mail"
                        label="E-post"
                        value={formValues.mail}
                        onChange={handleChange}
                        error={errors.mail}
                    />
                    {actionData?.fieldErrors?.mail && <p>{actionData.fieldErrors.mail}</p>}

                    <TextField
                        type="tel"
                        name="mobile"
                        label="Mobil"
                        value={formValues.mobile}
                        onChange={handleChange}
                        error={errors.mobile}
                    />
                    {actionData?.fieldErrors?.mobile && <p>{actionData.fieldErrors.mobile}</p>}

                    <HStack justify="end">
                        <Button onClick={handleSubmit}>Opprett bruker</Button>
                    </HStack>
                    <PersonvernModal />
                </VStack>
            </Page.Block>
    );
}
