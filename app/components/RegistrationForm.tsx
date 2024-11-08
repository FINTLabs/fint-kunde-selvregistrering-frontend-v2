import { Link, useActionData } from "@remix-run/react";
import { useState } from "react";
import {
  Button,
  HStack,
  VStack,
  TextField,
  Page,
  Alert,
} from "@navikt/ds-react";
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
  const [alreadyExists, setAlreadyExists] = useState(props.doesExist);
  const [errors, setErrors] = useState<Errors>({});
  const [created, setCreated] = useState(props.isCreated);

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
      newErrors.mail = "E-post adressen må inneholde ein @";
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
      // console.log(JSON.stringify(formValues));
      //
      // const newContact: IContact = {
      //   nin: formValues.nin,
      //   firstName: formValues.firstName,
      //   lastName: formValues.lastName,
      //   mail: formValues.mail,
      //   mobile: formValues.mobile,
      // };
      //
      // const contactExists = await ContactApi.checkIfExistingContact(newContact);
      // contactExists
      //   ? ContactApi.createContact(newContact).then((response) => {
      //       console.log(response);
      //       if (response.status === 200) {
      //         setCreated(true);
      //
      //       }
      //     })
      //   : setAlreadyExists(true);
    }
    setErrors(newErrors);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <Page.Block gutters width="md">
      <VStack gap="4" margin="20">
        {!created ? (
          <>
            <InfoBox />
            {alreadyExists ? (
              <Alert variant={"error"} className={"mb-6"}>
                Det ser ut som du allerede har en bruker.{" "}
                <Link
                  to="https://kunde.felleskomponent.no"
                  className="text-[#7F78E8]"
                >
                  Trykk på denne linken for å komme videre til Kundeportalen.
                </Link>
              </Alert>
            ) : (
              <></>
            )}

            <TextField
              type="number"
              name="nin"
              label="Fødselsnummer"
              value={formValues.nin}
              onChange={handleChange}
              error={errors.nin}
            />
            {actionData?.fieldErrors?.nin && (
              <p>{actionData.fieldErrors.nin}</p>
            )}

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
            {actionData?.fieldErrors?.mail && (
              <p>{actionData.fieldErrors.mail}</p>
            )}

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
          </>
        ) : (
          <>
            <Alert variant={"success"} className={"mb-8"}>
              Du er nå registrert i systemet vårt.{" "}
            </Alert>
            <Button as={"a"} href="https://kunde.felleskomponent.no">
              Trykk her for å gå til Kundeportalen.
            </Button>
          </>
        )}
      </VStack>
    </Page.Block>
  );
}
