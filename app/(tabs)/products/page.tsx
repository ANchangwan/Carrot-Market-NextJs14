import ListProduct from "@/components/list-product";
import db from "@/lib/db";

async function getProduct() {
  const products = await db.product.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      id: true,
    },
  });
  return products;
}

export default async function Product() {
  const product = await getProduct();
  return (
    <div className="flex flex-col p-5 gap-5">
      {product.map((product) => (
        <ListProduct key={product.id} {...product} />
      ))}
    </div>
  );
}
