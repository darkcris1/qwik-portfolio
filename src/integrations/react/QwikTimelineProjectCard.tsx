import { qwikify$ } from '@builder.io/qwik-react';
import { TimelineProjectCard } from './TimelineProjectCard';

export const QwikTimelineProjectCard = qwikify$(TimelineProjectCard, { eagerness: 'visible' });