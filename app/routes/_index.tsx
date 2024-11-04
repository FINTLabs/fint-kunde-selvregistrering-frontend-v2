import type { MetaFunction } from "@remix-run/node";
import {Box, Page } from "@navikt/ds-react";
import {PageHeader} from "~/components/PageHeader";
import {PageFooter} from "~/components/PageFooter";
import "~/components/RegistrationForm";
import RegistrationForm from "~/components/RegistrationForm";
import InfoBox from "~/components/InfoBox";

export const meta: MetaFunction = () => {
  return [
    { title: "Kunde Selvregistrering V2" },
    { name: "fint-kunde-selvregistrering-frontend-v2", content: "" },
  ];
};

export default function Index() {
  return (
      <Page
        footer={
            <Page.Block as="footer">
                <PageFooter/>
            </Page.Block>
        }
      >
        <Box as="header">
          <Page.Block className="bg-[#F8ECDC]">
            <PageHeader/>
          </Page.Block>
        </Box>
        <Box as="main">
            <Page.Block className="" width={'text'} gutters>
                <InfoBox/>
            </Page.Block>
            <RegistrationForm/>
        </Box>
      </Page>
  );
}
