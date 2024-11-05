import { Heading, HStack, Page, VStack } from "@navikt/ds-react";

export function PageHeader() {
  return (
    <Page.Block gutters width="lg">
      <HStack>
        <img
          src="/NovariLogo.png"
          alt="NovariFavicon"
          unselectable="on"
          className="h-16 p-4 pr-8"
        />
        <VStack justify="center">
          <Heading size={"large"} className={"text-[#F76650] pl-2"}>
            Novari Kundeportal selvregistrering
          </Heading>
        </VStack>
      </HStack>
    </Page.Block>
  );
}
