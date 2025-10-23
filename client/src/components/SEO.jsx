// client/src/components/SEO.jsx
import { useEffect } from 'react';

const SEO = ({ 
  title = 'Kanhaiya Krushi - Sustainable Agriculture Solutions',
  description = 'Your trusted partner in sustainable agriculture. Quality seeds, fertilizers, pesticides, and farming equipment. Expert agricultural consultation and services.',
  keywords = 'agriculture, farming, organic farming, seeds, fertilizers, pesticides, farm equipment, Maharashtra, India, sustainable agriculture, crop planning, soil testing',
  image = 'https://kanhaiyakrushi.com/logo512.png',
  url = 'https://kanhaiyakrushi.com',
  type = 'website'
}) => {
  useEffect(() => {
    document.title = title;

    const setMetaTag = (attr, key, content) => {
      if (!content) return;
      let element = document.querySelector(`meta[${attr}="${key}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const setLinkTag = (rel, href) => {
      if (!href) return;
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    setMetaTag('name', 'description', description);
    setMetaTag('name', 'keywords', keywords);
    setMetaTag('name', 'robots', 'index, follow');
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:image', image);
    setMetaTag('property', 'og:url', url);
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setLinkTag('canonical', url);

  }, [title, description, keywords, image, url, type]);

  return null;
};

export default SEO;