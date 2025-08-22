import { component$ } from "@builder.io/qwik";
import { NavLink } from "../NavLink";
import Logo from "../Logo";

export default component$(() => {
  return (
    <header class="sticky top-0 z-50 border-b bg-gray-950">
      <nav class="m-auto flex max-w-3xl flex-row items-center justify-between px-6">
        <div>
          <NavLink href="/">
            <Logo class="w-10" />
          </NavLink>
        </div>
        <ul class="flex">
          <li>
            <NavLink
              href="/#projects"
              activeClass="bg-white text-gray-950"
              class="block p-4 hover:bg-white hover:text-gray-950"
            >
              Projects
            </NavLink>
          </li>
          <li>
            <NavLink
              href="/#viz"
              activeClass="bg-white text-gray-950"
              class="block p-4 hover:bg-white hover:text-gray-950"
            >
              Viz
            </NavLink>
          </li>
          <li>
            <NavLink
              href="/#teaching"
              activeClass="bg-white text-gray-950"
              class="block p-4 hover:bg-white hover:text-gray-950"
            >
              Teaching
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
});
