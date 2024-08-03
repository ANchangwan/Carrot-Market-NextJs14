import ModalButton from "@/components/modal-button";
import { PhotoIcon } from "@heroicons/react/24/solid";

export default async function Modal({ params }: { params: { id: string } }) {
  
  return (
    <div className="absolute bg-opacity-60 w-full h-full z-50 flex justify-center items-center bg-black left-0 top-0">
      <div className="max-w-screen-sm w-full h-1/2 flex justify-center">
        <ModalButton />
        <div
          className="aspect-square  bg-neutral-700 text-neutral-200 
        rounded-md flex justify-center items-center"
        >
          <PhotoIcon className="h-28" />
        </div>
      </div>
    </div>
  );
}
