import { getPermalink, getBlogPermalink } from './utils/permalinks';

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
  socialLinks: [
    {
      ariaLabel: 'X (Twitter)',
      icon: 'tabler:brand-x',
      href: 'https://twitter.com/intent/tweet?url=https%3A%2F%2Fwww.123todo.com&text=Been%20using%20123%20ToDo%20to%20keep%20on%20top%20of%20things%20%E2%80%94%20free%20%26%20private!',
    },
    {
      ariaLabel: 'WhatsApp',
      icon: 'tabler:brand-whatsapp',
      href: 'https://wa.me/?text=Been%20using%20123%20ToDo%20to%20keep%20on%20top%20of%20things%20%E2%80%94%20free%20%26%20private!%20https%3A%2F%2Fwww.123todo.com',
    },
    {
      ariaLabel: 'Facebook',
      icon: 'tabler:brand-facebook',
      href: 'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.123todo.com',
    },
    {
      ariaLabel: 'LinkedIn',
      icon: 'tabler:brand-linkedin',
      href: 'https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fwww.123todo.com',
    },
    {
      ariaLabel: 'Reddit',
      icon: 'tabler:brand-reddit',
      href: 'https://www.reddit.com/submit?url=https%3A%2F%2Fwww.123todo.com&title=123%20ToDo%20-%20Free%20Privacy-First%20Task%20Manager',
    },
    {
      ariaLabel: 'Telegram',
      icon: 'tabler:brand-telegram',
      href: 'https://t.me/share/url?url=https%3A%2F%2Fwww.123todo.com&text=123%20ToDo',
    },
    {
      ariaLabel: 'Threads',
      icon: 'tabler:brand-threads',
      href: 'https://www.threads.net/intent/post?text=Been%20using%20123%20ToDo%20https%3A%2F%2Fwww.123todo.com',
    },
    {
      ariaLabel: 'Pinterest',
      icon: 'tabler:brand-pinterest',
      href: 'https://pinterest.com/pin/create/button/?url=https%3A%2F%2Fwww.123todo.com&media=https%3A%2F%2Fwww.123todo.com%2Fsocial-share.png&description=123%20ToDo',
    },
    { ariaLabel: 'RSS Feed', icon: 'tabler:rss', href: getPermalink('/rss.xml') },
  ],
  footNote: `
    Copyright © Unforgettable Management Ltd ${new Date().getFullYear()}. All rights reserved. | Website by <a href="https://www.2headsdesign.co.uk" target="_blank" rel="noopener" class="hover:underline">TWO Design & Marketing</a>
  `,
};
