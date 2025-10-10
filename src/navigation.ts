import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'About',
      href: getPermalink('/about'),
    },
    {
      text: 'User Guide',
      href: getPermalink('/guide'),
    },
    {
      text: 'Blog',
      href: getBlogPermalink(),
    },
  ],
  actions: [{ text: 'Open App', href: 'https://app.123todo.com', target: '_blank' }],
};

export const footerData = {
  links: [
    {
      title: 'Product',
      links: [
        { text: 'Features', href: getPermalink('/#features') },
        { text: 'User Guide', href: getPermalink('/guide') },
        { text: 'Open App', href: 'https://app.123todo.com' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { text: 'Blog', href: getBlogPermalink() },
        { text: 'About Us', href: getPermalink('/about') },
      ],
    },
    {
      title: 'Support',
      links: [
        { text: 'Report a Bug', href: 'mailto:support@123todo.com?subject=Bug%20Report', target: '_blank' },
        { text: 'Suggest Enhancement', href: 'mailto:support@123todo.com?subject=Feature%20Suggestion', target: '_blank' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { text: 'Terms of Service', href: getPermalink('/terms') },
        { text: 'Privacy Policy', href: getPermalink('/privacy') },
      ],
    },
  ],
  secondaryLinks: [],
  socialLinks: [
    { ariaLabel: 'X', icon: 'tabler:brand-x', href: '#' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
  ],
  footNote: `
    © ${new Date().getFullYear()} 123 ToDo. All rights reserved. | Website by <a href="https://www.2headsdesign.co.uk" target="_blank" rel="noopener" class="hover:underline">TWO Design & Marketing</a>
  `,
};
