import {Box, Heading, HStack } from "@navikt/ds-react";
import {Link} from "@remix-run/react";


export function PageFooter() {
    return (
        <Box
            style={{
                padding: '2rem 10rem',
                marginTop: '2rem',
                background: '#6B133D',
            }}>
            <Heading level="2" size="medium" spacing>
                <img src="public/NovariLogo.png" width={100} alt="Novari Logo" />
            </Heading>
            <div style={{ marginBottom: '1rem' }}>
                <HStack gap="4" className="text-[#7F78E8]">
                    <Link to="http://support.novari.no">Opprett supportsak</Link>
                    <p>
                        |
                    </p>
                    <Link to="http://novari.no">Novari.no</Link>
                    <p>
                        |
                    </p>
                    <Link to="http://fintlabs.no">Brukerhjelp</Link>
                </HStack>
            </div>
        </Box>
    )
}
