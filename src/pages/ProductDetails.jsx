import Navbar from '../components/Navbar'

function ProductDetails({ session }) {
  return (
    <div className="min-h-screen bg-[#F5F5F3] flex flex-col font-sans text-black">
      <Navbar session={session} />
      <main className="flex-1 flex flex-col items-center justify-center p-8">
        <h1 className="text-2xl font-bold uppercase tracking-wider">Product Details Page</h1>
        <p className="text-neutral-500 mt-2">Product details and selection options will load here.</p>
      </main>
    </div>
  )
}

export default ProductDetails
