import { Suspense } from "react";
import OrderSuccess from "./OrderSuccess";

export default function OrderSuccessPage(){

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderSuccess />
    </Suspense>
  );

}