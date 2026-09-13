import { getPermalink, getBlogPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Features',
      href: getPermalink('/#features'),
    },
    {
      text: 'User Guide',
      href: getPermalink('/guide'),
    },
    {
      text: 'Changelog',
      href: getPermalink('/changelog'),
    },
    {
      text: 'About',
      href: getPermalink('/about'),
    },
    {
      text: 'Blog',
      href: getBlogPermalink(),
    },
    {
      text: 'Support',
      links: [
        {
          text: 'Report a Bug',
          href: 'mailto:support@123todo.com?subject=Bug%20Report',
          target: '_blank',
        },
        {
          text: 'Suggest Enhancement',
          href: 'mailto:support@123todo.com?subject=Feature%20Suggestion',
          target: '_blank',
        },
      ],
    },
    {
      text: 'Legal',
      links: [
        {
          text: 'Terms of Service',
          href: getPermalink('/terms'),
        },
        {
          text: 'Privacy Policy',
          href: getPermalink('/privacy'),
        },
      ],
    },
    {
      text: 'Open App',
      href: 'https://app.123todo.com',
      target: '_blank',
    },
  ],
  actions: [{ text: 'Launch App', href: 'https://app.123todo.com', target: '_blank', variant: 'primary' as const }],
};

export const footerData = {
  links: [
    {
      title: 'Product',
      links: [
        { text: 'Features', href: getPermalink('/#features') },
        { text: 'User Guide', href: getPermalink('/guide') },
        { text: 'Changelog', href: getPermalink('/changelog') },
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
        {
          text: 'Suggest Enhancement',
          href: 'mailto:support@123todo.com?subject=Feature%20Suggestion',
          target: '_blank',
        },
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
  socialLinks: [],
  footNote: `
    Copyright © Unforgettable Management Ltd ${new Date().getFullYear()}. All rights reserved. | Website by <a href="https://www.2headsdesign.co.uk" target="_blank" rel="noopener" class="hover:underline">TWO Design & Marketing</a>
  `,
};
