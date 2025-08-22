import { component$ } from "@builder.io/qwik";
import { Link, type DocumentHead } from "@builder.io/qwik-city";
import { vizIndex } from "./viz/vizIndex";
import Card from "~/components/Card";

export default component$(() => {
  return (
    <main class="m-auto max-w-3xl p-6">
      <h1>Welcome to my website</h1>
      <div>
        This is currently a work in progress so the site is pretty bare-bones in
        terms of both content and style. Still, feel free to check out some of
        my work...
      </div>
      <section id="projects">
        <h2>Projects</h2>
        <div class="py-2">
          <h3>Athlete name pronunciation reference</h3>
          <div>
            <div>
              I like watching{" "}
              <Link href="https://www.ifsc-climbing.org/">IFSC</Link>{" "}
              competitions. Climbing is a great sport, the comps are exciting,
              and the commentary is good. However, the commentator (as of 2025)
              sometimes understandably struggles with pronouncing non-anglophone
              names of athletes. I thought I'd help by creating a
              community-sourced pronunciation reference.
            </div>
            <div class="flex justify-around py-2">
              <Link href="https://groomer.mivalek.com/">Live website</Link>
              <Link href="https://github.com/mivalek/mgroomer">
                GitHub repo
              </Link>
            </div>
          </div>
        </div>
        <div class="py-2">
          <h3>Plan B</h3>
          <div>
            A makeover of the{" "}
            <Link href="https://planb-jena.de/">Plan B Jena</Link> bouldering
            gym website. It includes an interactive map of the gym where staff
            can add information about current boulders for customers to view.
            <div class="flex justify-around py-2">
              <Link href="https://planb-jena.vercel.app/">Live demo</Link>
              <Link href="https://github.com/mivalek/plan_b">GitHub repo</Link>
            </div>
          </div>
        </div>
        <div class="py-2">
          <h3>gradR</h3>
          <div>
            <p>
              Back in my days as a teacher of quantitative research methods,
              statistic, and R, me and my colleagues would ask students to
              prepare assignment reports in R Markdown and submit the rendered
              HTML document. When it came to grading these assignments, we were
              all quite dissatisfied with the tools available in this or that
              virtual learning environment.
            </p>
            <p>
              I wished for a piece of software that would make it easy to import
              a grading rubric, apply it to a given assignment, attach comments
              to the HTML file, and export grades. So I went and made one...
            </p>
            <div class="flex justify-around py-2">
              <Link href="https://github.com/mivalek/gradr_desktop">
                GitHub repo
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section id="viz">
        <h2>Visualisations</h2>
        <div>
          This is a small library of interactive apps I created to help students
          understand basic statistical concepts.
        </div>
        <ul class="xs:grid-cols-2 grid justify-items-center gap-8 py-8 sm:grid-cols-3">
          {Object.entries(vizIndex).map(([key, val]) => (
            <li key={key} class="w-fit">
              <Card
                id={key}
                title={val.title}
                description={val.description}
                headingLevel={3}
              />
            </li>
          ))}
        </ul>
      </section>
      <section id="teaching">
        <h2>Teaching materials</h2>
        <div>
          Things should gradually appear here. Meanwhile, you can check out the{" "}
          <Link href="https://and2022.netlify.app/" target="_blank">
            website
          </Link>{" "}
          I made for the statistics in <span class="font-mono">R</span> module I
          taught at University of Sussex with my colleague Dr Jennifer Mankin.
          Be advised though, much of the content was written during COVID
          lockdown so the humour is slightly delirious...
        </div>
      </section>
    </main>
  );
});

export const head: DocumentHead = {
  title: "mivalek's GH pages",
  meta: [
    {
      name: "description",
      content: "GitHub pages website made with Qwik",
    },
  ],
};
