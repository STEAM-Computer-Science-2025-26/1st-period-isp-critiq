import { Suspense } from "react";
import ReviewClient from "./ReviewClient";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReviewClient />
    </Suspense>
  );
}