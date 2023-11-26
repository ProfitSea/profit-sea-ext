import React from "react";
import { DeleteOutlined } from "@mui/icons-material";

interface DeleteProductProps {
  loading: boolean;
  deleteListItem: () => void;
}

const DeleteProductListItem: React.FC<DeleteProductProps> = ({
  loading,
  deleteListItem,
}) => {
  return (
    <button
      disabled={loading}
      onClick={deleteListItem}
      className={`w-[21px] h-[21px] left-[69px] top-[1px] absolute justify-center items-center gap-2.5 inline-flex  ${
        loading && "cursor-progress"
      }`}
    >
      <div className="text-stone-800 text-xs font-semibold font-['SF Pro Text'] leading-[18px]">
        <DeleteOutlined />
      </div>
    </button>
  );
};

export default DeleteProductListItem;
