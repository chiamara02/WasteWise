import { useState } from 'react'

import Navbar from '../components/navbar.component'
import HeroSection from '../components/herosection.component'
import Mission from '../components/mission.component'
import ValuesSection from '../components/infofunzionalita.component'
import Footer from '../components/footer.component'
import InfoFunzionalita from '../components/infofunzionalita.component'

export default function HomePage() {

    return (
        <>
            <Navbar />,
            <HeroSection />,
            <Mission />,
            <InfoFunzionalita />,
            <Footer />
        </>
    )
}
