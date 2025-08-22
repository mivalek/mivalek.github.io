import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { vizIndex } from "./vizIndex";
// import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  const loading = useSignal(true);
  const id = useSignal<string>();
  const iFrameRef = useSignal<HTMLElement>();
  const data = useSignal<{
    title: string;
    description: string;
  }>();

  //   eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchId = urlParams.get("id") || "";
    if (!Object.keys(vizIndex).includes(searchId)) {
      loading.value = false;
      return;
    }
    id.value = searchId;
    data.value = vizIndex[searchId];
  });

  //   eslint-disable-next-line qwik/no-use-visible-task
  //   useVisibleTask$(({ track }) => {
  //     track(id);
  //     if (!iFrameRef.value || !id.value) return;
  //     const rect = iFrameRef.value.getBoundingClientRect();
  //     iFrameRef.value.style.height = window.innerHeight - rect.y + "px";
  //   });

  return (
    <main class="bg-white pt-2 text-black">
      <h1
        class="mx-6 text-center !text-2xl"
        dangerouslySetInnerHTML={data.value ? data.value.title : "&nbsp;"}
      ></h1>
      <div class="relative h-fit">
        <iframe
          onLoad$={() => {
            loading.value = false;
            const rect = iFrameRef.value!.getBoundingClientRect();
            iFrameRef.value!.style.height = window.innerHeight - rect.y + "px";
          }}
          ref={iFrameRef}
          id="viz"
          class="h-0 w-full bg-white"
          src={id.value && `/static/viz/${id.value}/index.html`}
        />
        {loading.value && (
          <div class="m-auto flex h-[80vh] items-center justify-center">
            Loading...
          </div>
        )}
        {!loading.value && !data.value && (
          <div class="m-auto flex h-[80vh] items-center justify-center">
            Viz not found
          </div>
        )}
      </div>
    </main>
  );
});
