import {Page} from "@navikt/ds-react";


export function PageHeader() {
    return (
        <Page.Block gutters width="lg">
            <img src="./NovariLogo.png" alt="NovariFavicon" unselectable="on" className="h-16 p-4"/>
        </Page.Block>
    )
}

