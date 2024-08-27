import { Suspense } from "react";
import SuccessPage from "./success";

export default function Success() {
  return (
    <Suspense fallback={<div id="loader"></div>}>
        <SuccessPage />;
    </Suspense>
  )
  
}