import { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { Alert, Box, Page, VStack } from "@navikt/ds-react";
import { PageHeader } from "~/components/PageHeader";
import { PageFooter } from "~/components/PageFooter";
import RegistrationForm from "~/components/RegistrationForm";
import {
  json,
  useActionData,
  useFetcher,
  useRouteError,
} from "@remix-run/react";
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
  const actionData = fetcher.data;

  const submitForm = (formData: FormData) => {
    console.log("index submitForm" + JSON.stringify(formData));
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
            {actionData && actionData.errorMessage ? (
              <Alert variant={"error"} className={"mb-8"}>
                {actionData.errorMessage}
              </Alert>
            ) : null}

            {actionData && actionData.created ? (
              <SuccessAlert />
            ) : (
              <>
                {actionData && actionData.alreadyExists ? (
                  <AlreadyExistAlert />
                ) : (
                  <></>
                )}

                <RegistrationForm
                  handleFormSubmit={
                    (submitForm, actionData && actionData.userXnin)
                  }
                />
              </>
            )}
          </VStack>
        </Page.Block>
      </Box>
    </Page>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const formNin = formData.get("nin") as string;
  const userXnin = request.headers.get("x-nin");

  if (!formNin) {
    console.log("NIN not found", formNin);
    return json({ message: "NIN not found", showError: true });
  } else {
    const contact: IContact = {
      nin: formNin,
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      mail: formData.get("mail") as string,
      mobile: formData.get("mobile") as string,
    };

    const returnValue = await ContactApi.createContact(contact, userXnin);
    console.log("action Create contract: " + contact);
    return returnValue;
  }
}
