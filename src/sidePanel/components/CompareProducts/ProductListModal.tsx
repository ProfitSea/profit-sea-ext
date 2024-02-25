import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import * as React from "react";
import { ListItemInterface } from "../../../utils/types/product-response.type";
import { listItemsSelector } from "../../redux/lists/listsSlice";
import { useAppSelector } from "../../redux/store";
import ProductDescription from "./ProductDescription";
import ProductImage from "./ProductImage";

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

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll={"paper"}
      fullWidth
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">
        <div className="self-stretch justify-start items-center gap-3.5 inline-flex">
          <ProductImage src={product.imgSrc} />
          <ProductDescription
            vendor={product.vendor}
            brand={product.brand}
            description={product.description}
            productNumber={product.productNumber}
            packSize={product.packSize}
          />
        </div>
        <br />
        <Typography variant="h6" gutterBottom>
          Select a product:{" "}
        </Typography>
      </DialogTitle>
      <DialogContent dividers={true}>
        <Box>
          {listItems.length > 0 && (
            <List
              dense
              sx={{
                width: "100%",
                bgcolor: "background.paper",
              }}
            >
              {listItems.map((item) => {
                const { product: product1 } = item;
                const labelId = `checkbox-list-secondary-label-${item.id}`;
                if (item.id === listItem.id) {
                  return null;
                }
                return (
                  <ListItem
                    key={item.id}
                    secondaryAction={
                      <Checkbox
                        edge="end"
                        onChange={(value) => console.log(value)}
                        checked={false}
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    }
                    disablePadding
                  >
                    <div
                      key={item.id}
                      className="self-stretch justify-start items-center gap-3.5 my-2 inline-flex"
                    >
                      <div className="w-12 h-12 bg-white rounded-md flex justify-center items-center border-[1px] border-zinc-300 ">
                        <img
                          className="w-[40px] h-[40px] p-[2px] rounded-md max-w-none"
                          src={product1.imgSrc}
                        />
                      </div>
                      <div className="w-[150px] grow shrink basis-0 flex-col justify-center items-start inline-flex">
                        <div
                          title={product1.vendor}
                          className="self-stretch text-zinc-800 text-[12px] font-semibold font-['SF Pro Text'] leading-[1.4] text-ellipsis overflow-hidden whitespace-nowrap"
                        >
                          {product1.vendor}
                        </div>
                        <div
                          title={product1.description}
                          className="self-stretch text-zinc-800 text-[12px] font-semibold font-['SF Pro Text'] leading-[1.4] text-ellipsis overflow-hidden whitespace-nowrap"
                        >
                          {product1.description}
                        </div>
                        <div
                          title={`${product1.productNumber} | ${product1.packSize}`}
                          className="self-stretch text-neutral-500 text-[12px] font-light font-['SF Pro Text'] leading-[18px]"
                        >
                          {`${product1.productNumber} | ${product1.packSize}`}
                        </div>
                      </div>
                    </div>
                  </ListItem>
                );
              })}
            </List>
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
