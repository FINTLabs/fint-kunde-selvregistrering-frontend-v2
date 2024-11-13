import { Alert } from "@navikt/ds-react";
import { Link } from "@remix-run/react";
import React from "react";

export default function AlreadyExistAlert() {
  return (
    <Alert variant={"error"} className={"mb-12 w-4/5"}>
      Det ser ut som du allerede har en bruker.{" "}
      <Link to="https://kunde.felleskomponent.no" className="text-[#7F78E8]">
        Trykk på denne linken for å komme videre til Kundeportalen.
      </Link>
    </Alert>
  );
}
