import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Clock, Info, Check, MapPinIcon, X, Volume2, VolumeX } from 'lucide-react'

export default function Component() {
  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [showCeremony, setShowCeremony] = useState(false)
  const [showReception, setShowReception] = useState(false)
  const [isMenuVisible, setIsMenuVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const target = new Date("2024-10-06T15:00:00")

    const interval = setInterval(() => {
      const now = new Date()
      const difference = target.getTime() - now.getTime()

      const d = Math.floor(difference / (1000 * 60 * 60 * 24))
      setDays(d)

      const h = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      )
      setHours(h)

      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      setMinutes(m)

      const s = Math.floor((difference % (1000 * 60)) / 1000)
      setSeconds(s)
    }, 1000)

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY) {
        setIsMenuVisible(false)
      } else {
        setIsMenuVisible(true)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    // Start playing the audio
    if (audioRef.current) {
      audioRef.current.play().catch(error => console.log("Audio autoplay was prevented:", error))
    }

    return () => {
      clearInterval(interval)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollY])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F5DC] font-serif">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Pinyon+Script&family=Cormorant+Garamond:wght@400;700&display=swap');
        
        h1, h2, h3 {
          font-family: 'Pinyon Script', cursive;
        }
        
        body {
          font-family: 'Cormorant Garamond', serif;
        }
      `}</style>
      <header className="w-full relative bg-[#0B5345] min-h-screen flex flex-col justify-center">
        <div className="absolute inset-0">
          <Image
            alt="Wedding background"
            className="object-cover"
            fill
            src="/placeholder.svg?height=1080&width=1920"
          />
          <div className="absolute inset-0 bg-[#0B5345] bg-opacity-70"></div>
        </div>
        <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 text-[#F5F5DC] p-4 inline-block">
            Oscar & Tatiana
          </h1>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl mt-6 text-[#F5F5DC]">
            <span className="border-b-4 border-[#D4AF37] pb-2">¡Nos Casamos!</span>
          </h2>
          <div className="mt-12 sm:mt-16">
            <p className="text-xl sm:text-2xl mb-4 text-[#F5F5DC]">Confírmanos tu asistencia</p>
            <button
              onClick={() => scrollToSection('confirmation')}
              className="bg-[#D4AF37] text-[#0B5345] px-6 py-3 rounded-full text-lg font-semibold hover:bg-[#C4A137] transition-colors duration-200"
            >
              Confirmar
            </button>
          </div>
        </div>
        <nav className={`fixed top-0 left-0 right-0 bg-[#0B5345] bg-opacity-90 shadow-md transition-transform duration-300 ease-in-out z-50 ${isMenuVisible ? 'translate-y-0' : '-translate-y-full'}`}>
          <ul className="flex flex-wrap justify-center space-x-4 p-4">
            <li>
              <button onClick={() => scrollToSection('countdown')} className="flex items-center text-[#F5F5DC] hover:text-[#D4AF37] transition-colors duration-200">
                <Clock className="mr-1" size={18} />
                <span className="hidden md:inline">Cuenta Regresiva</span>
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('info')} className="flex items-center text-[#F5F5DC] hover:text-[#D4AF37] transition-colors duration-200">
                <Info className="mr-1" size={18} />
                <span className="hidden md:inline">Lugar y Hora</span>
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('location')} className="flex items-center text-[#F5F5DC] hover:text-[#D4AF37] transition-colors duration-200">
                <MapPin className="mr-1" size={18} />
                <span className="hidden md:inline">Ubicación</span>
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('confirmation')} className="flex items-center text-[#F5F5DC] hover:text-[#D4AF37] transition-colors duration-200">
                <Check className="mr-1" size={18} />
                <span className="hidden md:inline">Confirmación</span>
              </button>
            </li>
          </ul>
        </nav>
        <button 
          onClick={toggleAudio}
          className="fixed bottom-4 right-4 z-50 bg-[#D4AF37] text-[#0B5345] p-2 rounded-full"
        >
          {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </button>
        <audio ref={audioRef} loop>
          <source src="/stephen-sanchez-until-i-found-you.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </header>

      <main className="flex-grow">
        <section id="countdown" className="py-12 bg-[#F5F5DC]">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8 text-[#0B5345]">Cuenta Regresiva</h2>
            <div className="flex flex-wrap justify-center space-x-4">
              <div className="bg-[#0B5345] p-4 rounded-lg shadow m-2 text-[#F5F5DC]">
                <span className="block text-4xl font-bold">{days}</span>
                <span>Días</span>
              </div>
              <div className="bg-[#0B5345] p-4 rounded-lg shadow m-2 text-[#F5F5DC]">
                <span className="block text-4xl font-bold">{hours}</span>
                <span>Horas</span>
              </div>
              <div className="bg-[#0B5345] p-4 rounded-lg shadow m-2 text-[#F5F5DC]">
                <span className="block text-4xl font-bold">{minutes}</span>
                <span>Minutos</span>
              </div>
              <div className="bg-[#0B5345] p-4 rounded-lg shadow m-2 text-[#F5F5DC]">
                <span className="block text-4xl font-bold">{seconds}</span>
                <span>Segundos</span>
              </div>
            </div>
          </div>
        </section>

        <div className="w-full h-[200px] bg-cover bg-center" style={{backgroundImage: "url('/placeholder.svg?height=200&width=1920')"}}></div>

        <section id="info" className="py-12 bg-[#0B5345] text-[#F5F5DC]">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">Lugar y Hora</h2>
            <div className="flex flex-wrap justify-center space-x-8">
              <div className="w-64 m-4 transform hover:scale-105 transition-transform duration-200">
                <button
                  onClick={() => setShowCeremony(true)}
                  className="w-full rounded-lg overflow-hidden shadow-lg bg-[#F5F5DC]"
                >
                  <Image
                    src="/placeholder.svg?height=150&width=256"
                    alt="Ceremonia"
                    width={256}
                    height={150}
                    className="w-full"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-xl mb-2 text-[#0B5345]">Ceremonia</h3>
                  </div>
                </button>
              </div>
              <div className="w-64 m-4 transform hover:scale-105 transition-transform duration-200">
                <button
                  onClick={() => setShowReception(true)}
                  className="w-full rounded-lg overflow-hidden shadow-lg bg-[#F5F5DC]"
                >
                  <Image
                    src="/placeholder.svg?height=150&width=256"
                    alt="Recepción"
                    width={256}
                    height={150}
                    className="w-full"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-xl mb-2 text-[#0B5345]">Recepción</h3>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="location" className="py-12 bg-[#F5F5DC]">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8 text-[#0B5345]">Ubicación</h2>
            <div className="flex flex-wrap justify-between">
              <div className="w-full md:w-[48%] mb-8 md:mb-0">
                <h3 className="text-2xl font-semibold mb-4 text-[#0B5345]">Ceremonia</h3>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.0273006235084!2d-74.04223052587616!3d4.765236241096505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f858d301c1e6d%3A0xbdcbac26af61fcb1!2sPARROQUIA%20St.%20JUAN%20MAR%C3%8DA%20VIANNEY!5e0!3m2!1sen!2sco!4v1725297596872!5m2!1sen!2sco" width="100%" height="450" style={{ border:0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
              </div>
              <div className="w-full md:w-[48%]">
                <h3 className="text-2xl font-semibold mb-4 text-[#0B5345]">Recepción</h3>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.0696796413295!2d-74.0400805258763!3d4.757904741160768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f858f1f2fa52d%3A0x42d9141a873a9709!2zQ3JhLiAxNiAjMTgxLTE0LCBVc2FxdcOpbiwgQm9nb3TDoQ!5e0!3m2!1sen!2sco!4v1725297711806!5m2!1sen!2sco" width="100%" height="450" style={{ border:0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
              </div>
            </div>
          </div>
        </section>

        <section id="confirmation" className="py-12 bg-[#0B5345]">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8 text-[#F5F5DC]">Confirmación</h2>
            <Link
              href="https://wa.me/573192767150?text=Nosotros%20la%20familia%20%5BIngrese%20el%20nombre%20de%20la%20familia%5D%20confirmamos%20nuestra%20asistencia%20al%20matrimonio.%20Muchisimas%20Gracias."
              className="bg-[#D4AF37] text-[#0B5345] px-6 py-3 rounded-full inline-block hover:bg-[#C4A137] transition-colors duration-200"
            >
              Confirmar por WhatsApp
            </Link>
          </div>
        </section>
      </main>

      {showCeremony && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#F5F5DC] p-8 rounded-lg max-w-md relative">
            <Image
              src="/placeholder.svg?height=200&width=400"
              alt="Ceremonia"
              width={400}
              height={200}
              className="w-full rounded-t-lg"
            />
            <h3 className="text-2xl font-bold my-4 text-[#0B5345]">Ceremonia</h3>
            <p className="mb-4">La ceremonia se llevará a cabo en la Parroquia San Juan María Vianney.</p>
            <p className="mb-2">Hora de llegada: 2:30 PM</p>
            <p className="mb-4 flex items-center">
              <MapPinIcon className="mr-2" size={18} />
              Calle 181 #14-01, Bogotá
            </p>
            <p className="mb-4"><strong>Dress Code:</strong> Hombres: Formal, Mujeres: Vestido largo</p>
            <button onClick={() => setShowCeremony(false)} className="absolute top-2 right-2 bg-[#F5F5DC] rounded-full p-1">
              <X size={24} />
            </button>
          </div>
        </div>
      )}

      {showReception && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#F5F5DC] p-8 rounded-lg max-w-md relative">
            <Image
              src="/placeholder.svg?height=200&width=400"
              alt="Recepción"
              width={400}
              height={200}
              className="w-full rounded-t-lg"
            />
            <h3 className="text-2xl font-bold my-4 text-[#0B5345]">Recepción</h3>
            <p className="mb-4">La recepción se realizará en el salón de eventos después de la ceremonia.</p>
            <p className="mb-2">Hora de llegada: 4:30 PM</p>
            <p className="mb-4 flex items-center">
              <MapPinIcon className="mr-2" size={18} />
              Cra. 16 #181-14, Bogotá
            </p>
            <p className="mb-4"><strong>Dress Code:</strong> Hombres: Formal, Mujeres: Vestido largo</p>
            <button onClick={() => setShowReception(false)} className="absolute top-2 right-2 bg-[#F5F5DC] rounded-full p-1">
              <X size={24} />
            </button>
          </div>
        </div>
      )}

      <footer className="bg-[#0B5345] text-[#F5F5DC] py-4 text-center">
        <p>&copy; 2024 Oscar & Tatiana. Todos los derechos reservados.</p>
      </footer>
    </div>
  )
}