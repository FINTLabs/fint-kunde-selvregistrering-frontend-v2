import { useActionData } from "@remix-run/react";
import React, { useEffect, useState } from "react";
import { Button, HStack, VStack, TextField } from "@navikt/ds-react";
import { PersonvernModal } from "~/components/PersonvernModal";
import InfoBox from "~/components/InfoBox";

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

  const [errors, setErrors] = useState<Errors>({});

  const [formValues, setFormValues] = useState({
    nin: "",
    firstName: "",
    lastName: "",
    mail: "",
    mobile: "",
  });

  const handleSubmit = async () => {
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
    } else if (!formValues.mail.includes("@")) {
      newErrors.mail = "E-post adressen må inneholde ein @.";
    }
    if (!formValues.mobile) {
      newErrors.mobile = "telefonnummer er påkrevd.";
    } else if (formValues.mobile.length < 8)
      newErrors.mobile = "Mobilnummer må være minst 8 siffer langt.";
    else {
      const formData = new FormData();
      formData.append("nin", formValues.nin);
      formData.append("firstName", formValues.firstName);
      formData.append("lastName", formValues.lastName);
      formData.append("mail", formValues.mail);
      formData.append("mobile", formValues.mobile);

      props.handleFormSubmit(formData);
    }
    setErrors(newErrors);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (isListenerActive && event.key === "Enter") {
      event.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    window.addEventListener(
      "keydown",
      handleKeyDown as unknown as EventListener
    );
    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown as unknown as EventListener
      );
  }, [isListenerActive, formValues]);

  const disableListener = () => setIsListenerActive(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <VStack gap="4" marginInline={"20"}>
      <InfoBox />
      <TextField
        type="number"
        name="nin"
        label="Fødselsnummer"
        value={formValues.nin}
        onChange={handleChange}
        error={errors.nin}
        defaultValue={"12345612345"}
      />
      {actionData?.fieldErrors?.nin && <p>{actionData.fieldErrors.nin}</p>}

      <TextField
        type="text"
        name="firstName"
        label="Fornavn"
        value={formValues.firstName}
        onChange={handleChange}
        error={errors.firstName}
        defaultValue={"TestUser"}
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
        defaultValue={"TestUser"}
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
        defaultValue={"TestUser@test.test"}
      />
      {actionData?.fieldErrors?.mail && <p>{actionData.fieldErrors.mail}</p>}

      <TextField
        type="tel"
        name="mobile"
        label="Mobil"
        value={formValues.mobile}
        onChange={handleChange}
        error={errors.mobile}
        defaultValue={"12345678"}
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
