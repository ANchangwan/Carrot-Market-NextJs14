export default function Home() {
  return (
    <main className="bg-gray-100 sm:bg-red-500 h-screen flex items-center justify-center p-5">
      <div className="bg-white w-full shadow-lg p-5 rounded-3xl max-w-screen-sm dark:bg-gray-500 flex flex-col md:flex-row md:items-center gap-2">
        <input
          className="w-full rounded-full p-4 h-12 hover:bg-gray-200 placeholder:bg-white outline-none ring ring-orange-500 ring-offset-2 ring-transparent focus:ring-offset-2 peer focus:ring-green-400  transition-shadow invalid:focus:ring-red-400 "
          type="email"
          required
          placeholder="Search Hear..."
        />
        <span className="text-red-500 font-medium hidden peer-invalid:block">
          email is requeired
        </span>
        <button className="bg-opacity-50 md:p-5 bg-black text-white py-2 rounded-full focus:scale-90 active:scale-90 transition-transform font-medium outline-none bg-gradient-to-tr from-cyan-500 to-purple-500 peer-required:bg-green-400">
          Search
        </button>
      </div>
    </main>
  );
}
