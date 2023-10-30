import React from "react";
import Home from "../Home";

interface ListBuilderProps {
  currentList: any;
}

const ListBuilder: React.FC<ListBuilderProps> = ({ currentList }) => {
  if (currentList.itemsCount > 0)
    return (
      <div className="bg-[#F5F5F5] flex-grow flex flex-col overflow-y-auto">
        {/* {loading ? (
            <p className="flex flex-1 justify-center items-center">
              Loading...
            </p>
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <div key={index}>
                <Product product={product} deleteProduct={deleteProduct} />
                <CustomDivider orientation="horizontal" />
              </div>
            ))
          ) : ( */}
        <p className="flex flex-1 justify-center items-center">No products</p>
        {/* )} */}
      </div>
    );
  else {
    return <Home />;
  }
};

export default ListBuilder;
