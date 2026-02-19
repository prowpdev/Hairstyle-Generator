import { HairstyleTemplate } from './types';

export const hairstyleTemplates: HairstyleTemplate[] = [
  {
    id: 'pixie-cut',
    name: 'Chic Pixie Cut',
    imageUrl: 'https://picsum.photos/seed/pixie/400/400',
    prompt: 'A chic and modern pixie cut, short on the sides and slightly longer on top, with a textured finish.'
  },
  {
    id: 'bob-cut',
    name: 'Classic Bob',
    imageUrl: 'https://picsum.photos/seed/bob/400/400',
    prompt: 'A classic, sharp bob cut that hits right at the jawline, with a clean, straight finish.'
  },
  {
    id: 'long-layers',
    name: 'Long Layers',
    imageUrl: 'https://picsum.photos/seed/longlayers/400/400',
    prompt: 'Long, flowing hair with soft, face-framing layers that add volume and movement.'
  },
  {
    id: 'wavy-shag',
    name: 'Wavy Shag',
    imageUrl: 'https://picsum.photos/seed/shag/400/400',
    prompt: 'A trendy, wavy shag haircut with lots of texture, choppy layers, and a rock-and-roll vibe.'
  },
  {
    id: 'curly-afro',
    name: 'Curly Afro',
    imageUrl: 'https://picsum.photos/seed/afro/400/400',
    prompt: 'A beautiful, voluminous curly afro, well-defined coils, and a rounded shape.'
  },
  {
    id: 'braids',
    name: 'Intricate Braids',
    imageUrl: 'https://picsum.photos/seed/braids/400/400',
    prompt: 'Intricate and beautiful cornrow braids, styled in a creative pattern.'
  }
];
