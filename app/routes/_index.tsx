import { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { Box, Page, VStack } from "@navikt/ds-react";
import { PageHeader } from "~/components/PageHeader";
import { PageFooter } from "~/components/PageFooter";
import RegistrationForm from "~/components/RegistrationForm";
import { json, useFetcher } from "@remix-run/react";
import ContactApi, { IContact } from "~/api/contactApi";
import React, { useEffect, useState } from "react";
import AlreadyExistAlert from "~/components/AlreadyExistAlert";
import SuccessAlert from "~/components/SuccessAlert";

export const meta: MetaFunction = () => {
  return [
    { title: "Kunde Selvregistrering V2" },
    { name: "fint-kunde-selvregistrering-frontend-v2", content: "" },
  ];
};

export default function Index() {
  const fetcher = useFetcher();
  const [alreadyExists, setAlreadyExists] = useState(false);
  const [created, setCreated] = useState(false);

  useEffect(() => {
    if (fetcher.data) {
      if (fetcher.data.alreadyExists) {
        setAlreadyExists(true);
        setCreated(false);
        console.log("useEffect, alreadyExists");
      } else if (fetcher.data.created) {
        setCreated(true);
        setAlreadyExists(false);
        console.log("useEffect, created");
      }
    }
  }, [fetcher.data]);

  const submitForm = (formData: FormData) => {
    console.log("submitForm");
    fetcher.submit(formData, { method: "POST", action: "" });
  };

  return (
    <Page
      footer={
        <Page.Block as="footer">
          <PageFooter />
        </Page.Block>
      }
    >
      <Box as="header">
        <Page.Block className="bg-[#F8ECDC]">
          <PageHeader />
        </Page.Block>
      </Box>
      <Box as="main">
        <Page.Block gutters width="md">
          <VStack justify="center" align={"center"} marginBlock={"12"}>
            {alreadyExists ? <AlreadyExistAlert /> : <></>}
            {!created ? (
              <RegistrationForm handleFormSubmit={submitForm} />
            ) : (
              <SuccessAlert />
            )}
          </VStack>
        </Page.Block>
      </Box>
    </Page>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const nin = formData.get("nin") as string;

  if (!nin) {
    console.log("NIN not found", nin);
    return json({ message: "NIN not found", showError: true });
  } else {
    const contact: IContact = {
      nin,
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      mail: formData.get("mail") as string,
      mobile: formData.get("mobile") as string,
    };

    try {
      await ContactApi.createContact(
        contact,
        () => json({ alreadyExists: true }), // onAlreadyExists callback
        () => json({ created: true }) // onCreated callback
      );
      console.log("action Create contract: " + contact);
    } catch (error) {
      console.log("action createContact error: " + error);
      return json({ error: error.message });
    }
  }
}
