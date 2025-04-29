import { useDispatch } from "react-redux";
import { updateCart } from "@/redux/slice/cartAndWishlistSlice";
import { useRef } from "react";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const RemoveFromCartDialog = ({ productId }) => {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const removeFromCart = () => {
    dispatch(updateCart({ id: productId, add: false }));
    ref.current?.click();
  };

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          You really want to remove this product from Cart
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel ref={ref}>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={() => removeFromCart()}>
          Remove
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default RemoveFromCartDialog;
