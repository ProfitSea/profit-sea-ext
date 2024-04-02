import React from "react";

interface UpdateQuantityButtonProps {
  loading: boolean;
  updateQuantity: () => void;
  updateTitle: string;
}

const UpdateQuantityButton: React.FC<UpdateQuantityButtonProps> = ({
  loading,
  updateQuantity,
  updateTitle,
}) => {
  return (
    <button
      disabled={loading}
      onClick={updateQuantity}
      className={`w-[21px] h-[21px] top-[1px] absolute bg-stone-800 rounded-xl justify-center items-center gap-2.5 inline-flex ${
        updateTitle === "+" ? "left-0" : "left-[69px]"
      } ${loading && "cursor-not-allowed"}`}
    >
      <div className="text-white text-xs font-semibold font-['SF Pro Text'] leading-[18px]">
        {updateTitle}
      </div>
    </button>
  );
};

export default UpdateQuantityButton;
