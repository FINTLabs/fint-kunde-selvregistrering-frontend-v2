import { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { Box, Page } from "@navikt/ds-react";
import { PageHeader } from "~/components/PageHeader";
import { PageFooter } from "~/components/PageFooter";
import "~/components/RegistrationForm";
import RegistrationForm from "~/components/RegistrationForm";
import { json, useActionData, useFetcher } from "@remix-run/react";
import ContactApi, { IContact } from "~/api/contactApi";

export const meta: MetaFunction = () => {
  return [
    { title: "Kunde Selvregistrering V2" },
    { name: "fint-kunde-selvregistrering-frontend-v2", content: "" },
  ];
};

export default function Index() {
  const fetcher = useFetcher();

  const submitForm = (
    formData: FormData,
    alreadyExists?: boolean,
    created?: boolean
  ) => {
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
        <RegistrationForm handleFormSubmit={submitForm} />
      </Box>
    </Page>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  console.log("ActionFunction", formData);

  const nin = formData.get("nin") as string;

  if (nin === null || nin === undefined || nin === "") {
    console.log("Nin not found", nin);
    return json({ message: "NIN not found", showError: true });
  } else {
    const exists = await ContactApi.checkIfExistingContact(nin);

    if (!exists) {
      const contact: IContact = {
        nin: nin,
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        mail: formData.get("mail") as string,
        mobile: formData.get("mobile") as string,
      };

      ContactApi.createContact(contact);
    } else {
      console.log("exists");
      return json({ message: "Contact already exists" });
    }
  }
}
