import {Alert, Box} from "@navikt/ds-react";


export default function InfoBox() {

    return (
        <Box padding={"8"} paddingBlock={"12"}>
            <Alert variant={"info"}>Hei på deg! Her står det skrift som består av bokstaver.</Alert>
        </Box>
    )
}