import { qwikify$ } from "@builder.io/qwik-react";
import Lightbox, { type Slide } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
// Optional: Import plugins if you want to use them
// import Captions from "yet-another-react-lightbox/plugins/captions";
// import "yet-another-react-lightbox/plugins/captions.css";
// import Zoom from "yet-another-react-lightbox/plugins/zoom";
// import "yet-another-react-lightbox/plugins/zoom.css";

// Define the props that our Qwik component will accept
// These should match the props of the React Lightbox component
interface ReactLightboxProps {
  open: boolean;
  close: () => void;
  slides: Slide[];
  // Add other props from yet-another-react-lightbox as needed
  // e.g., index, plugins, etc.
}

// Qwikify the React Lightbox component
// client:idle means the component will hydrate on the client when it becomes visible or interacted with.
// You might adjust this based on when you need the lightbox to be interactive.
export const QwikLightbox = qwikify$<ReactLightboxProps>(
  Lightbox,
  {
    // eagerEventProps: ['onClick$'] // if you need to pass QRLs as event handlers
    // clientOnly: true, // if the component should only render on the client
  }
);

// If you want to use plugins, you might qwikify a wrapper component
// that includes them:
//
// const LightboxWithPlugins = (props: ReactLightboxProps) => {
//   return (
//     <Lightbox
//       {...props}
//       plugins={[Captions, Zoom]} // Example plugins
//     />
//   );
// };
//
// export const QwikLightboxWithPlugins = qwikify$<ReactLightboxProps>(
//   LightboxWithPlugins
// );