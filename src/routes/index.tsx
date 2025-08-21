import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
      <h1>Hi 👋</h1>
      <div>
        Working on it...
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "mivalek's GH pages",
  meta: [
    {
      name: "description",
      content: "GitHub pages website with Qwik",
    },
  ],
};
