import { HairstyleTemplate, Gender } from './types';

export const hairstyleTemplates: HairstyleTemplate[] = [
  // Women's Hairstyles
  {
    id: 'w-pixie-cut',
    name: 'Chic Pixie Cut',
    imageUrl: './images/chic-pixie.jpg',
    prompt: 'A chic and modern pixie cut on a woman, short on the sides and slightly longer on top, with a textured finish.',
    gender: Gender.WOMAN
  },
  {
    id: 'w-bob-cut',
    name: 'Classic Bob',
    imageUrl: './images/classic-bob.jpg',
    prompt: 'A classic, sharp bob cut on a woman that hits right at the jawline, with a clean, straight finish.',
    gender: Gender.WOMAN
  },
  {
    id: 'w-long-layers',
    name: 'Long Layers',
    imageUrl: './images/long-layers.jpg',
    prompt: 'Long, flowing hair on a woman with soft, face-framing layers that add volume and movement.',
    gender: Gender.WOMAN
  },
  {
    id: 'w-wavy-shag',
    name: 'Wavy Shag',
    imageUrl: 'https://images.pexels.com/photos/761963/pexels-photo-761963.jpeg?auto=compress&cs=tinysrgb&w=400',
    prompt: 'A trendy, wavy shag haircut on a woman with lots of texture, choppy layers, and a rock-and-roll vibe.',
    gender: Gender.WOMAN
  },
  {
    id: 'w-curly-afro',
    name: 'Curly Afro',
    imageUrl: 'https://images.pexels.com/photos/11293720/pexels-photo-11293720.jpeg?auto=compress&cs=tinysrgb&w=400',
    prompt: 'A beautiful, voluminous curly afro on a woman, with well-defined coils and a rounded shape.',
    gender: Gender.WOMAN
  },
  {
    id: 'w-braids',
    name: 'Intricate Braids',
    imageUrl: 'https://images.pexels.com/photos/2777898/pexels-photo-2777898.jpeg?auto=compress&cs=tinysrgb&w=400',
    prompt: 'Intricate and beautiful cornrow braids on a woman, styled in a creative pattern.',
    gender: Gender.WOMAN
  },

  // Men's Hairstyles
  {
    id: 'm-undercut',
    name: 'Modern Undercut',
    imageUrl: 'https://images.pexels.com/photos/2065195/pexels-photo-2065195.jpeg?auto=compress&cs=tinysrgb&w=400',
    prompt: 'A stylish modern undercut on a man, with short sides and a longer, slicked-back top.',
    gender: Gender.MAN
  },
  {
    id: 'm-crew-cut',
    name: 'Classic Crew Cut',
    imageUrl: 'https://images.pexels.com/photos/247204/pexels-photo-247204.jpeg?auto=compress&cs=tinysrgb&w=400',
    prompt: 'A classic, short crew cut on a man, faded on the sides and slightly longer on top.',
    gender: Gender.MAN
  },
  {
    id: 'm-long-hair',
    name: 'Long & Wavy',
    imageUrl: 'https://images.pexels.com/photos/3998419/pexels-photo-3998419.jpeg?auto=compress&cs=tinysrgb&w=400',
    prompt: 'Long, wavy hair on a man, with a natural, rugged look.',
    gender: Gender.MAN
  },
  {
    id: 'm-buzz-cut',
    name: 'Buzz Cut',
    imageUrl: 'https://images.pexels.com/photos/1813947/pexels-photo-1813947.jpeg?auto=compress&cs=tinysrgb&w=400',
    prompt: 'A clean and sharp buzz cut on a man, very short all over.',
    gender: Gender.MAN
  },
  {
    id: 'm-dreads',
    name: 'Dreadlocks',
    imageUrl: 'https://images.pexels.com/photos/1599303/pexels-photo-1599303.jpeg?auto=compress&cs=tinysrgb&w=400',
    prompt: 'Stylish dreadlocks on a man, tied back or hanging loose.',
    gender: Gender.MAN
  },
  {
    id: 'm-pompadour',
    name: 'Pompadour',
    imageUrl: 'https://images.pexels.com/photos/2896423/pexels-photo-2896423.jpeg?auto=compress&cs=tinysrgb&w=400',
    prompt: 'A voluminous pompadour hairstyle on a man, with faded sides and a high-volume top.',
    gender: Gender.MAN
  }
];
