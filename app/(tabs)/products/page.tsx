import ListProduct from "@/components/list-product";
import ProductList from "@/components/product-list";
import Link from "next/link";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Metadata } from "next";
import { unstable_cache as nextCache } from "next/cache";

const getCachedProducts = nextCache(getInitialProducts, ["home-products"]);
// unstable_cache(DB query function, keysparts)

async function getInitialProducts() {
  console.log("hit!!");
  const products = await db.product.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      id: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });
  return products;
}

export type InitialProducts = Prisma.PromiseReturnType<
  typeof getInitialProducts
>;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Product",
  };
}

export default async function Product() {
  const initialProducts = await getCachedProducts();
  return (
    <div>
      <ProductList initialProducts={initialProducts} />
      <Link
        href="/products/add"
        className="
        bg-orange-500 flex justify-center rounded-full
          items-center size-16 fixed bottom-28 right-8 
        text-white transition-color hover:bg-orange-400
        "
      >
        <PlusIcon className="size-10"></PlusIcon>
      </Link>
    </div>
  );
}
