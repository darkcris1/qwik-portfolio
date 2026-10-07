import { component$ } from "@qwik.dev/core";
import {
  RouterOutlet,
  ServiceWorkerRegister,
  useQwikRouter,
} from "@qwik.dev/router";
import { RouterHead } from "./components/router-head/router-head";
import { isDev } from "@qwik.dev/core";

import "./global.css";

export default component$(() => {
  useQwikRouter();

  // Keep the <head> and <body> elements here.
  return (
    <>
      <head>
        <meta charset="utf-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=""></link>
        <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Unbounded:wght@500;700&display=swap" rel="stylesheet"></link>

        {!isDev && (
          <link
            rel="manifest"
            href={`${import.meta.env.BASE_URL}manifest.json`}
          />
        )}
        {!isDev && (
          <script
            defer
            src="https://cloud.umami.is/script.js"
            data-website-id="917ea9b6-3a12-4a20-8c9e-49c8e3d74056"
          />
        )}
        <RouterHead />
      </head>
      <body lang="en">
        <RouterOutlet />
        {!isDev && <ServiceWorkerRegister />}
      </body>
    </>
  );
});
