import { DeleteOutlined } from "@mui/icons-material";
import React from "react";
import ProductInterface from "../../../utils/product.interface";
import productsApi from "../../../api/productsApi";

interface ProductProps {
  product: ProductInterface;
  deleteProduct: (productNumber: ProductInterface["productNumber"]) => void;
}

const Product: React.FC<ProductProps> = ({ product, deleteProduct }) => {
  const [quantity, setQuantity] = React.useState(product.quantity);
  const [timeoutId, setTimeoutId] = React.useState<ReturnType<
    typeof setTimeout
  > | null>(null);

  const updateProducts = async () => {
    try {
      await productsApi.updateProduct(product.id!, {
        quantity,
      });
    } catch (error) {
      alert("Error updating product");
      console.log(error);
    }
  };

  const handleUpdateQuantity = (increment: boolean) => {
    if (timeoutId) clearTimeout(timeoutId);

    // Increment or decrement based on the boolean flag
    setQuantity((prev) => (increment ? prev + 1 : prev - 1));

    const id = setTimeout(() => {
      updateProducts();
    }, 500); // waits for 500ms after the last button press

    setTimeoutId(id);
  };

  return (
    <div className="w-[100%] px-3.5 bg-white flex-col justify-start items-start gap-3.5 inline-flex">
      <div className="self-stretch py-[17px] bg-white flex-col justify-start items-start gap-3.5 flex">
        <div className="self-stretch justify-start items-center gap-3.5 inline-flex">
          <div className="w-16 h-16 bg-white rounded-md flex justify-center items-center border-[1px] border-zinc-300 ">
            <img
              className="w-[62px] h-[62px] p-[2px] rounded-md max-w-none"
              src={product.imgSrc}
            />
          </div>
          <div className="w-[200px] grow shrink basis-0 flex-col justify-center items-start inline-flex">
            <div className="self-stretch text-zinc-800 text-[13px] font-semibold font-['SF Pro Text'] leading-[1.4]">
              {product?.vendor}
              <br />
              <span className="text-[12px] font-light">{product?.brand}</span>
              <br />
              {product?.description}
            </div>
            <div className="self-stretch text-neutral-500 text-[12px] font-light font-['SF Pro Text'] leading-[18px]">
              {`${product?.productNumber} | ${product?.packSize}`}
            </div>
          </div>
          <div className="justify-center items-end gap-2.5 flex">
            <div className="h-[79px] flex-col justify-start items-center inline-flex">
              {product?.prices.map((price, index) => (
                <div
                  key={price.price + index}
                  className="w-[87px] h-[47px] text-center text-zinc-800 text-sm font-semibold font-['SF Pro Text'] leading-[21px]"
                >
                  {`${price?.price} ${price?.unit}`}
                </div>
              ))}
              <div className="w-[90px] h-[23px] relative">
                <button
                  onClick={() => handleUpdateQuantity(true)}
                  className="w-[21px] h-[21px] left-0 top-[1px] absolute bg-stone-800 rounded-xl justify-center items-center gap-2.5 inline-flex"
                >
                  <div className="text-white text-xs font-semibold font-['SF Pro Text'] leading-[18px]">
                    +
                  </div>
                </button>
                <div className="w-[26px] h-[23px] left-[33px] top-0 absolute rounded-[5px] border border-slate-200" />
                <div className="w-5 left-[36px] top-[2.50px] absolute text-center text-black text-xs font-semibold font-['SF Pro Text'] leading-[18px]">
                  {quantity}
                </div>
                {quantity !== 0 ? (
                  <button
                    onClick={() => handleUpdateQuantity(false)}
                    className="w-[21px] h-[21px] left-[69px] top-[1px] absolute bg-stone-800 rounded-xl justify-center items-center gap-2.5 inline-flex"
                  >
                    <div className="text-white text-xs font-semibold font-['SF Pro Text'] leading-[18px]">
                      -
                    </div>
                  </button>
                ) : (
                  <button
                    onClick={() => deleteProduct(product.id!)}
                    className="w-[21px] h-[21px] left-[69px] top-[1px] absolute justify-center items-center gap-2.5 inline-flex"
                  >
                    <div className="text-stone-800 text-xs font-semibold font-['SF Pro Text'] leading-[18px]">
                      <DeleteOutlined />
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
