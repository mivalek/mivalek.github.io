import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export default component$(
  (props: {
    id: string;
    title: string;
    description: string;
    headingLevel: 2 | 3;
  }) => {
    return (
      <Link href={`/viz/?id=${props.id}`} class="block w-fit">
        <div class="relative flex flex-row overflow-clip !text-white hover:[&>div]:translate-y-0">
          <img
            height={250}
            width={200}
            class="h-[250px] object-cover"
            src={`/static/viz/${props.id}/thumbnail.png`}
            alt="thumbnail"
          />
          <div class="absolute inset-0 flex translate-y-[calc(100%_-_3.5rem)] flex-col text-sm transition-transform">
            <div class="flex h-14 items-center justify-center bg-gray-950/85 px-4 text-center">
              {props.headingLevel === 2 ? (
                <h2
                  class="m-0 text-base"
                  dangerouslySetInnerHTML={props.title}
                ></h2>
              ) : (
                <h3
                  class="m-0 text-base"
                  dangerouslySetInnerHTML={props.title}
                ></h3>
              )}
            </div>
            <div class="flex grow items-center bg-white px-4 !text-black">
              <div dangerouslySetInnerHTML={props.description}></div>
            </div>
          </div>
        </div>
      </Link>
    );
  },
);
