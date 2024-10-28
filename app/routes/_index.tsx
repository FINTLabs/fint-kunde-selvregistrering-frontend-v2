import type { MetaFunction } from "@remix-run/node";
import {Box, Button, HStack, Page, TextField, VStack} from "@navikt/ds-react";
import {Form} from "@remix-run/react";
import {PageHeader} from "~/components/PageHeader";
import {PageFooter} from "~/components/PageFooter";
import {PersonvernModal} from "~/components/PersonvernModal";

export const meta: MetaFunction = () => {
  return [
    { title: "Kunde Selvregistrering V2" },
    { name: "fint-kunde-selvregistrering-frontend-v2", content: "" },
  ];
};

export default function Index() {
  return (
      <Page className="h-full">
        <Box as="header">
          <Page.Block className="bg-[#F8ECDC]">
            <PageHeader/>
          </Page.Block>
        </Box>
        <Box as="main">
          <Form method="post">
            <Page.Block gutters width="md">
              <VStack gap="4" padding="20">
                <TextField type="number" name="nin" label="Fødselsnummer" />
                <TextField type="text" name="firstName" label="Fornavn" />
                <TextField type="text" name="lastName" label="Etternavn" />
                <TextField type="email" name="mail" label="E-post" />
                <TextField type="tel" name="mobile" label="Mobil" />
                  <HStack justify="end" >
                    <Button type="submit">Opprett bruker</Button>
                  </HStack>
                <PersonvernModal/>
              </VStack>
            </Page.Block>
          </Form>
        </Box>
        <Page.Block as="footer">
          <PageFooter/>
        </Page.Block>
      </Page>
  );
}
