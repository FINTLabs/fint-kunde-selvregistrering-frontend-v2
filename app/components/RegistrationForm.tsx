import { useActionData } from "@remix-run/react";
import React, { useEffect, useState } from "react";
import { Button, HStack, VStack, TextField } from "@navikt/ds-react";
import { PersonvernModal } from "~/components/PersonvernModal";
import InfoBox from "~/components/InfoBox";
import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "react-router";

type ActionData = {
  formError?: string;
  fieldErrors?: {
    firstName?: string;
    lastName?: string;
    mail?: string;
    mobile?: string;
  };
  fields?: {
    firstName: string;
    lastName: string;
    mail: string;
    mobile: string;
  };
};

type Errors = {
  firstName?: string;
  lastName?: string;
  mail?: string;
  mobile?: string;
  alreadyExists?: boolean;
};

interface Props {
  handleFormSubmit: (formData: FormData) => void;
  doesExist?: boolean;
  isCreated?: boolean;
}

export default function RegistrationForm(props: Props) {
  const actionData = useActionData<ActionData>();
  const [isListenerActive, setIsListenerActive] = useState(true);
  const { userXnin } = useLoaderData();
  const [errors, setErrors] = useState<Errors>({});
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    mail: "",
    mobile: "",
  });

  const handleSubmit = async () => {
    const newErrors: Errors = {};

    if (formValues.firstName.trim().length === 0) {
      newErrors.firstName = "Fornavn er påkrevd.";
    }
    if (formValues.lastName.trim().length === 0) {
      newErrors.lastName = "Etternavn er påkrevd.";
    }
    if (!formValues.mail) {
      newErrors.mail = "E-post adresse er påkrevd.";
    } else if (!formValues.mail.includes("@")) {
      newErrors.mail = "E-post adressen må inneholde en @.";
    }
    if (!formValues.mobile) {
      newErrors.mobile = "Telefonnummer er påkrevd.";
    } else if (formValues.mobile.length <= 7) {
      newErrors.mobile = "Mobilnummer må være minst 8 siffer langt.";
    }

    if (Object.keys(newErrors).length === 0) {
      const formData = new FormData();
      formData.append("firstName", formValues.firstName);
      formData.append("lastName", formValues.lastName);
      formData.append("mail", formValues.mail);
      formData.append("mobile", formValues.mobile);

      props.handleFormSubmit(formData);
      setErrors({});
    } else {
      setErrors(newErrors);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (isListenerActive && event.key === "Enter") {
      event.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    const listener = (event: KeyboardEvent) =>
      handleKeyDown(event as unknown as React.KeyboardEvent);
    if (isListenerActive) {
      window.addEventListener("keydown", listener);
    }
    return () => window.removeEventListener("keydown", listener);
  }, [isListenerActive]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <VStack gap="4" marginInline={"20"}>
      <InfoBox />
      <TextField type="number" disabled name="nin" label="Fødselsnummer" />
      {actionData?.fieldErrors?.nin && <p>{actionData.fieldErrors.nin}</p>}

      <TextField
        type="text"
        name="firstName"
        label="Fornavn"
        value={formValues.firstName}
        onChange={handleChange}
        error={errors.firstName}
      />
      {actionData?.fieldErrors?.firstName && (
        <p>{actionData.fieldErrors.firstName}</p>
      )}

      <TextField
        type="text"
        name="lastName"
        label="Etternavn"
        value={formValues.lastName}
        onChange={handleChange}
        error={errors.lastName}
      />
      {actionData?.fieldErrors?.lastName && (
        <p>{actionData.fieldErrors.lastName}</p>
      )}

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
      {actionData?.fieldErrors?.mobile && (
        <p>{actionData.fieldErrors.mobile}</p>
      )}

      <HStack justify="end">
        <Button onClick={handleSubmit}>Opprett bruker</Button>
      </HStack>
      <PersonvernModal />
    </VStack>
  );
}
