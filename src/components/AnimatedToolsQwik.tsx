import { qwikify$ } from '@builder.io/qwik-react';
import AnimatedToolsComponent from '../integrations/react/AnimatedTools';

export const AnimatedTools = qwikify$(AnimatedToolsComponent, {
  eagerness: 'visible', // Load and hydrate when the component becomes visible
});