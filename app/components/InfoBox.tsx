import { Alert, Box } from "@navikt/ds-react";

export default function InfoBox() {
  return (
    <Box padding={"8"} paddingBlock={"12"}>
      <Alert variant={"info"} size={"small"}>
        Det ser ut som du har prøvd å gå inn på Novari IKS kundeportalen for
        første gang. Registrer deg her for å få tilgang til tjenestene våre.{" "}
      </Alert>
    </Box>
  );
}
