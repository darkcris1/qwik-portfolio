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
        <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,100..900&display=swap" rel="stylesheet"></link>

        {!isDev && (
          <link
            rel="manifest"
            href={`${import.meta.env.BASE_URL}manifest.json`}
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
