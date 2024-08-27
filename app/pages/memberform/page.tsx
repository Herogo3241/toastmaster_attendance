import { Suspense } from "react";
import Form from "./form";

export default function MemberForm() {
  return (
    <Suspense fallback={<div id="loader"></div>}>
      <Form />
    </Suspense>
  );

}


