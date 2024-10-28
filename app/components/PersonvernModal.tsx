import {BodyLong, Box, Heading, Modal, List} from "@navikt/ds-react";
import {useRef} from "react";
import {ListItem} from "@navikt/ds-react/List";

export function PersonvernModal() {
    const ref = useRef<HTMLDialogElement>(null);

    return (
        <Box>
        Ved å registrere deg her gir du samtykke til vår{" "}
            <a className="text-[#7F78E8]" onClick={() => ref.current?.showModal()}>
                personvernerklæring
            </a>

            <Modal
                ref={ref}
                closeOnBackdropClick
                header={{ heading: "Personvernerklæring for kundeportalen"}}
            >
                <Modal.Body>
                    <BodyLong>
                        Ved at du registrerer deg på kundeportalen for Novari IKS, samtykker du samtidig til at Novari IKS
                        behandler de av dine personopplysninger som er nødvendig for å ivareta og forvalte tilgangen.
                    </BodyLong>
                    <Heading size="medium" className="py-2">Hvilke opplysninger samler vi inn?</Heading>
                    <BodyLong>Opplysninger som blir innhentet:</BodyLong>
                    <List as="ul">
                        <ListItem>Navn</ListItem>
                        <ListItem>Fødselsnummer</ListItem>
                        <ListItem>E-postadresse</ListItem>
                        <ListItem>Telefonnummer</ListItem>
                    </List>
                    <Heading size="medium" className="pb-2">Hva er det rettslige grunnlaget for behandlingen?</Heading>
                    <BodyLong>
                        Det rettslige grunnlaget for behandlingen er samtykke (se GDPR art. 6 nr. 1 a).
                        Du kan raskt og enkelt trekke tilbake samtykket ved å sende en e-post til oss på{' '}
                        <a className="text-[#7F78E8]" href="mailto:personvern@vigoiks.no">personvern@vigoiks.no</a>.
                    </BodyLong>
                    <Heading size="medium" className="py-2">Hvordan kan du klage?</Heading>
                    <BodyLong className="pb-2">
                        Dersom du er uenig i måten vi behandler dine personopplysninger på, kan du sende inn en klage til Datatilsynet.
                    </BodyLong>
                </Modal.Body>
            </Modal>
        </Box>

    )
}