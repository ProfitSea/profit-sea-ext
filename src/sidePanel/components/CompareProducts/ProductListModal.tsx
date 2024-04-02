import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import Box from "@mui/material/Box";
import * as React from "react";
import { ListItemInterface } from "../../../utils/types/product-response.type";
import { listItemsSelector } from "../../redux/lists/listsSlice";
import { useAppSelector } from "../../redux/store";
import ProductDescription from "./ProductDescription";
import ProductImage from "./ProductImage";
import ProductListItem from "./ProductListItem";
import ProductSearch from "./ProductSearch";

interface ProductsListModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  listItem: ListItemInterface;
  loading: boolean;
  addComparisonListItem: (
    baseListItemId: string,
    comparisonListItemId: string
  ) => void;
}

const ProductsListModal: React.FC<ProductsListModalProps> = ({
  open,
  setOpen,
  listItem,
  loading,
  addComparisonListItem,
}) => {
  const handleClose = () => setOpen(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const { product } = listItem;
  const [selectedProduct, setSelectedProduct] = React.useState<string>("");
  const listItems = useAppSelector(listItemsSelector);
  const handleSelectChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedProduct(event.target.value);
    },
    []
  );

  const handleSearchChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value.toLowerCase());
    },
    []
  );

  const filteredItems = listItems.filter(
    (item) =>
      item.product.description.toLowerCase().includes(searchTerm) ||
      item.product.brand.toLowerCase().includes(searchTerm) ||
      item.product.productNumber.toLowerCase().includes(searchTerm)
  );

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll="paper"
      fullWidth
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">
        <div className="self-stretch justify-start items-center gap-3.5 inline-flex">
          <ProductImage src={product.imgSrc} />
          <ProductDescription
            vendor={product.vendor.name}
            brand={product.brand}
            description={product.description}
            productNumber={product.productNumber}
            packSize={product.packSize}
          />
        </div>
      </DialogTitle>
      <DialogContent
        sx={{ padding: "10px 16px", minHeight: "500px" }}
        dividers={true}
      >
        {/* I want to have an search bar */}
        <ProductSearch onChange={handleSearchChange} />
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center", // Centers content when few items are present
          }}
        >
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend">Select a product:</FormLabel>
            {filteredItems.length > 0 ? (
              <RadioGroup
                aria-label="product"
                name="product"
                onChange={handleSelectChange}
              >
                {filteredItems.map((item) => {
                  if (item.id === listItem.id) {
                    return null;
                  }
                  return (
                    <FormControlLabel
                      value={item.id}
                      key={item.id}
                      label={<ProductListItem item={item} />}
                      className="gap-[20px]"
                      disabled={item.isAnchored}
                      control={<Radio />}
                    />
                  );
                })}
              </RadioGroup>
            ) : (
              <div className="flex items-center justify-center h-[300px]">
                No products found
              </div>
            )}
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={loading || !selectedProduct}
          className={`${loading ? "cursor-not-allowed" : ""}`}
          onClick={() => addComparisonListItem(listItem.id, selectedProduct)}
        >
          {loading ? "Adding..." : "Add"}
        </Button>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductsListModal;
