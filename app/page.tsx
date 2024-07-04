export default function Home() {
  return (
    <main className="bg-gray-100 sm:bg-red-500 h-screen flex items-center justify-center p-5">
      <div className="bg-white w-full shadow-lg p-5 rounded-3xl max-w-screen-sm  flex flex-col md:flex-row gap-3">
        {["Nico", "me", "you", "hello"].map((name, index) => (
          <div className=" flex items-center gap-3 p-2 group: " key={index}>
            <div className="size-7 bg-blue-500 rounded-full " />
            <span className="group-hover:text-red-500 group-focus-within:text-orange-500">
              {name}
            </span>
            <div className="size-5 bg-red-500 rounded-full text-white flex justify-center items-center relative">
              <div className="size-5 bg-red-500 rounded-full absolute  animate-ping"></div>
              <span className="z-10">{index}</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
