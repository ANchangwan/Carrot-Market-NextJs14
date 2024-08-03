"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

export default function ModalButton() {
  const router = useRouter();
  const onCloseClick = () => {
    router.back();
  };
  return (
    <button
      onClick={onCloseClick}
      className="absolute z-50 right-14 top-5 text-neutral-200"
    >
      <XMarkIcon className="size-10" />
    </button>
  );
}
