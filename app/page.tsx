export default function Home() {
  return (
    <main className="bg-gray-100 h-screen flex items-center justify-center p-5 dark:bg-gray-700">
      <div className="bg-white w-full shadow-lg p-5 rounded-3xl max-w-screen-sm dark:bg-gray-500 flex flex-col gap-2">
        <input
          className="w-full rounded-full p-4 h-12 hover:bg-gray-200 placeholder:bg-white outline-none ring ring-orange-500 ring-offset-2"
          type="text"
          placeholder="Search Hear..."
        />
        <button className="bg-opacity-50 bg-black text-white py-2 rounded-full focus:scale-90 active:scale-90 transition-transform font-medium outline-none">
          Search
        </button>
      </div>
    </main>
  );
}
