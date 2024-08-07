import { Suspense } from "react";
import ErrorPage from "./error";

export default function Error() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <ErrorPage />;
    </Suspense>
  ); 
  
}
