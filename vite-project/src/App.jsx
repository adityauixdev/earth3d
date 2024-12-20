import { useState, Suspense, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import Model from '../public/Earth.jsx'

function App() {
  const [activeView, setActiveView] = useState('front')
  const orbitControlsRef = useRef()

  const handleView = (position) => {
    if (orbitControlsRef.current) {
      const controls = orbitControlsRef.current
      setActiveView(position)
      
      const animateCamera = (targetDistance) => {
        const startDistance = controls.getDistance()
        const duration = 1000 // 1 second
        const startTime = Date.now()
        
        const animate = () => {
          const now = Date.now()
          const elapsed = now - startTime
          const progress = Math.min(elapsed / duration, 1)
          
          const easeProgress = 1 - Math.pow(1 - progress, 3)
          
          const currentDistance = startDistance + (targetDistance - startDistance) * easeProgress
          controls.minDistance = currentDistance
          controls.maxDistance = currentDistance
          
          if (progress < 1) {
            requestAnimationFrame(animate)
          }
        }
        
        animate()
      }
      
      switch(position) {
        case 'top':
          controls.setAzimuthalAngle(0)
          controls.setPolarAngle(0)
          animateCamera(6)
          break
        case 'bottom':
          controls.setAzimuthalAngle(0)
          controls.setPolarAngle(Math.PI)
          animateCamera(3.5)
          break
        case 'left':
          controls.setAzimuthalAngle(-Math.PI / 2)
          controls.setPolarAngle(Math.PI / 2)
          animateCamera(2.8)
          break
        case 'right':
          controls.setAzimuthalAngle(Math.PI / 2)
          controls.setPolarAngle(Math.PI / 2)
          animateCamera(2.8)
          break
        case 'front':
          controls.setAzimuthalAngle(0)
          controls.setPolarAngle(Math.PI / 2)
          animateCamera(5)
          break
      }

      controls.update()
    }
  }

  return (
    <>
      <Canvas camera={{ position: [0, 0, 2.5], fov: 50 }}>
        <ambientLight intensity={2} />
        <OrbitControls 
          ref={orbitControlsRef}
          enableZoom={false} 
          enablePan={false} 
          enableRotate={true}
          minPolarAngle={0}
          maxPolarAngle={Math.PI}
          dampingFactor={0.1}
          rotateSpeed={0.5}
        />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
        <Environment preset="sunset" />
      </Canvas>

      <nav className="view-buttons">
        <button 
          onClick={() => handleView('front')}
          className={activeView === 'front' ? 'active' : ''}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Front View
        </button>
        <button 
          onClick={() => handleView('top')}
          className={activeView === 'top' ? 'active' : ''}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
          </svg>
          Top View
        </button>
        <button 
          onClick={() => handleView('bottom')}
          className={activeView === 'bottom' ? 'active' : ''}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
          </svg>
          Bottom View
        </button>
        <button 
          onClick={() => handleView('left')}
          className={activeView === 'left' ? 'active' : ''}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Left View
        </button>
        <button 
          onClick={() => handleView('right')}
          className={activeView === 'right' ? 'active' : ''}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
          Right View
        </button>
      </nav>
    </>
  )
}

export default App
