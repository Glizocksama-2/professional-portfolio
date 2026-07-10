import { bio } from '@/lib/content';

export default function manifest() {
  return {
    name: `${bio.name} — Portfolio`,
    short_name: 'Brian Mukwe',
    description: `${bio.role} in ${bio.location}`,
    start_url: '/',
    display: 'standalone',
    background_color: '#111112',
    theme_color: '#d2ff00',
    icons: [{ src: '/favicon.ico', sizes: 'any', type: 'image/x-icon' }],
  };
}
