import {
  ActionFunctionArgs,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { Alert, Box, Button, Page, VStack } from "@navikt/ds-react";
import { PageHeader } from "~/components/PageHeader";
import { PageFooter } from "~/components/PageFooter";
import RegistrationForm from "~/components/RegistrationForm";
import { json, useFetcher, useLoaderData } from "@remix-run/react";
import ContactApi, { IContact } from "~/api/contactApi";
import React from "react";
import AlreadyExistAlert from "~/components/AlreadyExistAlert";
import SuccessAlert from "~/components/SuccessAlert";

export const meta: MetaFunction = () => {
  return [
    { title: "Kunde Selvregistrering V2" },
    { name: "fint-kunde-selvregistrering-frontend-v2", content: "" },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const userXnin = request.headers.get("x-nin");

  if (!userXnin) {
    throw new Response(
      "Manglende personnummer i header. Missing 'x-nin' header",
      { status: 400 }
    );
  }
  return { userXnin };
};

export default function Index() {
  const fetcher = useFetcher();
  const actionData = fetcher.data;

  const submitForm = (formData: FormData) => {
    formData.append("actionType", "CREATE_NEW");
    console.log("index submitForm" + JSON.stringify(formData));
    fetcher.submit(formData, { method: "POST", action: "" });
  };

  function handleDelete() {
    const formData = new FormData();
    formData.append("actionType", "DELETE_CONTACT");
    fetcher.submit(formData, { method: "DELETE" });
  }

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

                <RegistrationForm handleFormSubmit={submitForm} />
              </>
            )}
            <VStack padding={"8"} justify={"end"} align={"end"}>
              <Button
                onClick={handleDelete}
                as={"button"}
                variant={"danger"}
                size={"small"}
              >
                Slett bruker
              </Button>
            </VStack>
          </VStack>
        </Page.Block>
      </Box>
    </Page>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const userXnin = request.headers.get("x-nin") as string;
  const actionType = formData.get("actionType") as string;

  switch (actionType) {
    case "CREATE_NEW":
      if (!userXnin) {
        console.log("NIN not found", userXnin);
        return json({ message: "NIN not found", showError: true });
      } else {
        const contact: IContact = {
          nin: userXnin,
          firstName: formData.get("firstName") as string,
          lastName: formData.get("lastName") as string,
          mail: formData.get("mail") as string,
          mobile: formData.get("mobile") as string,
        };
        const returnValue = await ContactApi.createContact(contact, userXnin);
        console.log("action Create contract: " + contact);
        return returnValue;
      }

    case "DELETE_CONTACT":
      console.log("Delete blir kjørt fra index");

      const response = await ContactApi.deleteContact(userXnin);
      console.log(response);

      if (response.ok) {
        return json({ message: "Delete contact successful", showError: true });
      } else {
        return json({ message: "Something went wrong", showError: true });
      }

    default:
      return json({
        message: "Something went wrong. Ukjent action.",
        showError: true,
      });
  }
}
