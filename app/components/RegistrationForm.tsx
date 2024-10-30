// app/routes/register.tsx
import { Form, useActionData } from "@remix-run/react";
import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {useEffect, useState} from "react";
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

// Server-side validation function
export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const nin = formData.get("nin") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const mail = formData.get("mail") as string;
    const mobile = formData.get("mobile") as string;

    const fieldErrors: ActionData["fieldErrors"] = {};

    if (!nin) fieldErrors.nin = "Fødselsnummer er påkrevd.";
    else if (nin.length !== 11) fieldErrors.nin = "Fødselsnummer må være 11 siffer langt.";

    if (!firstName) fieldErrors.firstName = "Fornavn er påkrevd.";
    if (!lastName) fieldErrors.lastName = "Etternavn er påkrevd.";
    if (!mail) fieldErrors.mail = "E-post er påkrevd.";

    if (!mobile) fieldErrors.mobile = "Mobilnummer er påkrevd.";
    else if (mobile.length < 8) fieldErrors.mobile = "Mobilnummer må være minst 8 siffer langt.";

    if (Object.keys(fieldErrors).length) {
        return json<ActionData>({ fieldErrors, fields: { nin, firstName, lastName, mail, mobile } }, { status: 400 });
    }

    return redirect("/success");
};

export default function RegistrationForm() {
    const actionData = useActionData<ActionData>();

    const [formValues, setFormValues] = useState({
        nin: "",
        firstName: "",
        lastName: "",
        mail: "",
        mobile: "",
    });
    const [clientError, setClientError] = useState<string | null>(null);
    const [submitButtonType, setSubmitButtonType] = useState<"button" | "submit">("button");
    const [firstNameError, setFirstNameError] = useState<string | undefined>();
    // Validation function
    const validateForm = () => {
        const { nin, firstName, lastName, mail, mobile } = formValues;

        if (!nin || nin.length !== 11) return false;
        if (!firstName) return false;
        if (!lastName) return false;
        if (!mail) return false;
        return !(!mobile || mobile.length < 8);

    };

    // Update submit button type based on validation
    useEffect(() => {
        if (validateForm()) {
            setClientError(null); // Clear any error messages
            setSubmitButtonType("submit");
        } else {
            setClientError("Please ensure all fields are filled out correctly."); // Set error message if validation fails
            setSubmitButtonType("button");
        }
    }, [formValues]);

    const handleSubmit = ()=> {
        console.log("Hello World");
        if (formValues.firstName && formValues.firstName?.length < 3) {

            setFirstNameError('Formal er påkrevd');
            }
        };

    const handleSubmitButton = () => {
        console.log("Hello World");
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };





    return (
        // <Form method="post">
            <Page.Block gutters width="md">
                <VStack gap="4" padding="20">
                    <TextField
                        type="number"
                        name="nin"
                        label="Fødselsnummer"
                        value={formValues.nin}
                        onChange={handleChange}

                    />
                    {actionData?.fieldErrors?.nin && <p>{actionData.fieldErrors.nin}</p>}

                    <TextField
                        type="text"
                        name="firstName"
                        label="Fornavn"
                        value={formValues.firstName}
                        onChange={handleChange}
                        error={firstNameError}
                    />
                    {actionData?.fieldErrors?.firstName && <p>{actionData.fieldErrors.firstName}</p>}

                    <TextField
                        type="text"
                        name="lastName"
                        label="Etternavn"
                        value={formValues.lastName}
                        onChange={handleChange}
                    />
                    {actionData?.fieldErrors?.lastName && <p>{actionData.fieldErrors.lastName}</p>}

                    <TextField
                        type="email"
                        name="mail"
                        label="E-post"
                        value={formValues.mail}
                        onChange={handleChange}
                    />
                    {actionData?.fieldErrors?.mail && <p>{actionData.fieldErrors.mail}</p>}

                    <TextField
                        type="tel"
                        name="mobile"
                        label="Mobil"
                        value={formValues.mobile}
                        onChange={handleChange}
                    />
                    {actionData?.fieldErrors?.mobile && <p>{actionData.fieldErrors.mobile}</p>}

                    {/* Show client-side error message under submit button */}
                    {clientError && <p style={{ color: "red" }}>{clientError}</p>}

                    <HStack justify="end">
                        <Button onClick={handleSubmitButton}>Opprett bruker</Button>
                    </HStack>
                    <PersonvernModal />
                </VStack>
            </Page.Block>
        // </Form>
    );
}
