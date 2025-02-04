import { useFormStatus } from "react-dom";

function RestaurantFormSubmit() {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending}>
      {pending ? "Submitting..." : "Share Restaurant"}
    </button>
  );
}

export default RestaurantFormSubmit;
