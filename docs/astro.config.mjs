import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  base: process.env.BASE_PATH,
  integrations: [
    starlight({
      title: 'react-bs-datatable',
      social: {
        github: 'https://github.com/imballinst/react-bs-datatable'
      },
      customCss: [
        // Relative path to your custom CSS file
        './src/styles/custom.css'
      ],
      sidebar: [
        {
          label: 'Examples Intro',
          link: '/examples'
        },
        {
          label: 'Uncontrolled',
          autogenerate: { directory: 'examples/uncontrolled' }
        },
        {
          label: 'Storybook',
          link: 'https://imballinst.github.io/react-bs-datatable/storybook',
          attrs: {
            target: '_blank',
            'data-sidebar-class': 'external'
          }
        }
      ]
    })
  ]
});
