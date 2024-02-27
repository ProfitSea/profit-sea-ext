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

interface ProductsListModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  listItem: ListItemInterface;
}

const ProductsListModal: React.FC<ProductsListModalProps> = ({
  open,
  setOpen,
  listItem,
}) => {
  const handleClose = () => setOpen(false);
  const { product } = listItem;
  const listItems = useAppSelector(listItemsSelector);
  const handleSelectChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log(event.target.value);
      // Implement your change logic here
    },
    []
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
          <ProductDescription {...product} />
        </div>
      </DialogTitle>
      <DialogContent dividers={true}>
        <Box>
          {listItems.length > 0 && (
            <FormControl component="fieldset" fullWidth>
              <FormLabel component="legend">Select a product:</FormLabel>
              <RadioGroup
                aria-label="product"
                name="product"
                onChange={handleSelectChange}
              >
                {listItems.map((item) => {
                  if (item.id === listItem.id) {
                    return null;
                  }
                  console.log(item);
                  return (
                    <FormControlLabel
                      value={item.id}
                      key={item.id}
                      label={
                        <ProductListItem item={item} />
                      }
                      className="gap-[20px]"
                      disabled={item.isAnchored}
                      control={<Radio />}
                    />
                  );
                })}
              </RadioGroup>
            </FormControl>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductsListModal;
