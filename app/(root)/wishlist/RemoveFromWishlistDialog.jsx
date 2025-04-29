import { useDispatch } from "react-redux";
import { updateWishlist } from "@/redux/slice/cartAndWishlistSlice";
import { useRef } from "react";
import {
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";

const RemoveFromWishlistDialog = ({ productId }) => {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const removeFromWatchlist = () => {
    dispatch(updateWishlist({ id: productId, add: false }));
    ref.current?.click();
  };

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          You really want to remove this product from Wishlist
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel ref={ref}>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={() => removeFromWatchlist()}>
          Remove
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default RemoveFromWishlistDialog;
