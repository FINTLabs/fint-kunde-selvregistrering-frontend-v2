import { Alert, Button } from "@navikt/ds-react";
import React from "react";

export default function SuccessAlert() {
  return (
    <>
      <Alert variant={"success"} className={"mb-8"}>
        Du er nå registrert i systemet vårt.{" "}
      </Alert>
      <Button as={"a"} href="https://kunde.felleskomponent.no">
        Trykk her for å gå til Kundeportalen.
      </Button>
    </>
  );
}
