import { Suspense } from "react";
import SuccessPage from "./success";

export default function Success() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <SuccessPage />;
    </Suspense>
  )
  
}