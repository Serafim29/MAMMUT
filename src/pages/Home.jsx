import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import heroImg from '../assets/background-sign.jpg'

function Home({ session }) {
  return (
    <div className="min-h-screen bg-[#F5F5F3] flex flex-col font-sans text-black">
      <Navbar session={session} />

    </div>
  )
}

export default Home
