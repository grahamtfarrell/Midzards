import { useState } from 'react'
import { BentoGrid } from './components/BentoGrid'
import { LandingPage } from './components/LandingPage'
import { StarBanner } from './components/StarBanner'
import { VultureFlyby } from './components/VultureFlyby'

function App() {
  const [entered, setEntered] = useState(false)

  return (
    <>
      <StarBanner />
      <VultureFlyby entered={entered} />
      {entered ? (
        <BentoGrid />
      ) : (
        <LandingPage onEnter={() => setEntered(true)} />
      )}
    </>
  )
}

export default App
