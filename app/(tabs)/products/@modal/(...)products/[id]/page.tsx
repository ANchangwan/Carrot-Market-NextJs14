import ModalButton from "@/components/modal-button";
import db from "@/lib/db";
import { PhotoIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { notFound } from "next/navigation";

async function getProduct(id: number) {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  });
  return product;
}

export default async function Modal({ params }: { params: { id: string } }) {
  const product = await getProduct(+params.id);
  if (!product) {
    return notFound();
  }
  return (
    <div className="absolute bg-opacity-60 w-full h-full z-50 flex justify-center items-center bg-black left-0 top-0">
      <div className="max-w-screen-sm w-full h-1/2 flex justify-center">
        <ModalButton />
        <div className="flex max-w-screen-md">
          <div className="relative aspect-square text-neutral-200 rounded-md flex justify-center items-center">
            {product ? (
              <Image fill src={product.photo} alt={product.title} />
            ) : (
              <PhotoIcon className="h-28" />
            )}
          </div>

          {product && (
            <div
              className=" p-4 flex flex-col justify-center gap-10 bg-neutral-500
            px-5
            "
            >
              <h1 className="text-xl font-bold">title : {product.title}</h1>
              <h2 className="text-lg">price : {product.price}</h2>
              <p className="mt-2">description :{product.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
