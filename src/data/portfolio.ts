import type { PortfolioProject } from '@/types';
import aegisEnquiryDesktop from '../../assets/aegissquad_enquiry_desktop.png';
import aegisEnquiryMobile from '../../assets/aegissquad_enquiry_mobile.png';
import aegisImageDesktop from '../../assets/aegissquad_image_desktop.png';
import aegisImageMobile from '../../assets/aegissquad_image_mobile.png';
import aegisStorefrontDesktop from '../../assets/aegissquad_storefront_desktop.png';
import aegisStorefrontMobile from '../../assets/aegissquad_storefront_mobile.png';
import conversionDesktop from '../../assets/conversion_desktop.png';
import conversionMobile from '../../assets/conversion_mobile.png';
import kiraqCatalogDesktop from '../../assets/kiraq_catalog_desktop.png';
import kiraqImageLoadDesktop from '../../assets/kiraq_imageload_desktop.png';
import kiraqImageLoadMobile from '../../assets/kiraq_imageload_mobile.png';
import kiraqProductMobile from '../../assets/kiraq_product_mobile.png';
import kiraqStorefrontDesktop from '../../assets/kiraq_storefront_desktop.png';
import kiraqStorefrontMobile from '../../assets/kiraq_storefront_mobile.png';
import mittalPopupDesktop from '../../assets/mittal_popup_desktop.png';
import mittalPopupMobile from '../../assets/mittal_popup_mobile.png';
import mittalProjectsDesktop from '../../assets/mittal_projects_desktop.png';
import mittalProjectsMobile from '../../assets/mittal_projects_mobile.png';
import mittalStorefrontDesktop from '../../assets/mittal_storefront_desktop.png';
import mittalStorefrontMobile from '../../assets/mittal_storefront_mobile.png';
import productEngineDesktop from '../../assets/productengine_desktop.png';
import productEngineMobile from '../../assets/productengine_mobile.png';
import storefrontDesktop from '../../assets/storefront_desktop.png';
import storefrontMobile from '../../assets/storefront_mobile.png';

// ============================================================================
// Real case studies only. Keep results factual and use structured fields so
// the portfolio UI can show project visuals, tools, challenges and systems
// without inventing client proof.
// ============================================================================

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: 'the-vibed-vines',
    title: 'The Vibed Vines - Premium Anime Streetwear E-commerce',
    client: 'The Vibed Vines',
    industry: 'Fashion / Streetwear / DTC E-commerce',
    projectUrl: 'https://thevibedvines.com',
    imageUrl: storefrontDesktop,
    services: [
      'Brand Strategy',
      'Creative Direction',
      'UI/UX Design',
      'E-commerce Experience Design',
      'Frontend Development',
      'Product Creation',
      'Product Copywriting',
      'Mockup Design',
      'WhatsApp Commerce Integration',
      'Technical SEO',
      'Structured Data (JSON-LD)',
      'Answer Engine Optimization',
      'Conversion Optimization',
      'Performance Optimization',
    ],
    serviceIds: ['web', 'shopify', 'content', 'ai', 'brand', 'ecomseo'],
    challenge:
      'Create a complete premium e-commerce ecosystem from the ground up for an anime-inspired streetwear brand. The goal was to establish a distinctive identity, increase perceived product value, simplify product discovery, and deliver a seamless shopping journey while supporting direct conversions through WhatsApp.',
    strategy:
      'Built the entire experience around storytelling, culture, and conversion. Focused on premium UI/UX, cinematic presentation, mobile-first interactions, product-led layouts, optimized customer flows, structured SEO architecture, and frictionless purchasing through integrated WhatsApp ordering.',
    solution:
      'Designed and developed the complete e-commerce website entirely from scratch including brand-led UI/UX, storefront architecture, collection experience, responsive frontend, and conversion systems. Created product structure, product titles, descriptions, visual mockups, ordering workflows, and implemented production-ready integrations. Delivered technical SEO, JSON-LD structured data, working contact forms, WhatsApp ordering, Google Search Console setup, Microsoft Clarity, and scalable foundations for future growth.',
    deliverables: [
      'Complete e-commerce website',
      'Custom UI/UX system',
      'Responsive frontend development',
      'Homepage experience',
      'Collection pages',
      'Product detail pages',
      'Product creation and catalog setup',
      'Product titles and descriptions',
      'Product mockup design',
      'WhatsApp order flow',
      'Working contact form',
      'Technical SEO',
      'JSON-LD structured data',
      'Metadata architecture',
      'Google Search Console setup',
      'Microsoft Clarity setup',
      'Performance optimization',
      'Conversion optimization',
    ],
    tools: [
      'React',
      'Tailwind CSS',
      'Framer Motion',
      'Lucide icons',
      'WhatsApp commerce',
      'Google Search Console',
      'Microsoft Clarity',
      'JSON-LD schema',
      'Technical SEO',
      'AEO content structure',
    ],
    challenges: [
      'Turn a brand idea into a complete premium storefront with no inherited design system.',
      'Make anime streetwear products feel higher value through copy, mockups and product storytelling.',
      'Reduce buying friction by routing interested customers into a direct WhatsApp order flow.',
      'Build search foundations for products, collections, metadata, JSON-LD, AEO and future content growth.',
    ],
    highlights: [
      'Brand-led visual system',
      'Mobile-first store journey',
      'Product creation and mockups',
      'WhatsApp order conversion',
      'SEO, AEO and JSON-LD layer',
      'Search Console and Clarity setup',
    ],
    integrations: [
      'WhatsApp click-to-order flow',
      'Working contact form',
      'Google Search Console',
      'Microsoft Clarity',
      'JSON-LD product and website schema',
      'Metadata and indexing foundations',
    ],
    metrics: [
      { value: 'Full', label: 'commerce build' },
      { value: 'SEO', label: 'AEO + JSON-LD' },
      { value: 'WA', label: 'order flow' },
      { value: 'UX', label: 'mockups + copy' },
    ],
    gallery: [
      {
        title: 'Storefront direction',
        label: 'UI/UX',
        imageUrl: storefrontDesktop,
        mobileImageUrl: storefrontMobile,
        description: 'A dark premium storefront system with product-led sections, cultural cues and clear buying paths.',
      },
      {
        title: 'Product engine',
        label: 'Catalog',
        imageUrl: productEngineDesktop,
        mobileImageUrl: productEngineMobile,
        description: 'Product titles, descriptions, mockups and collection structure created to support browsing and search.',
      },
      {
        title: 'Conversion systems',
        label: 'Growth',
        imageUrl: conversionDesktop,
        mobileImageUrl: conversionMobile,
        description: 'WhatsApp ordering, contact capture, SEO/AEO structure, JSON-LD, Search Console and Clarity wired into the launch.',
      },
    ],
    timeline: '4-6 weeks',
    results:
      'Delivered a fully functional premium commerce experience with a strong brand identity, streamlined customer journey, scalable content architecture, and a conversion-focused ordering system through WhatsApp.',
    testimonial:
      'A complete digital ecosystem that transformed The Vibed Vines from an idea into a premium streetwear shopping experience with strong identity and seamless customer interaction.',
    heroImageAlt:
      'Custom-built premium anime streetwear e-commerce website featuring immersive UI, product storytelling, WhatsApp ordering, and conversion-focused design.',
    featured: true,
    isPlaceholder: false,
  },
  {
    slug: 'kiraq',
    title: 'KIRAQ - Minimal Luxury Jewelry D2C Platform',
    client: 'KIRAQ',
    industry: 'Jewelry / Minimal Luxury / DTC E-commerce',
    projectUrl: 'https://kiraq.in',
    imageUrl: kiraqStorefrontDesktop,
    services: [
      'Brand Strategy',
      'Minimal Luxury UI/UX Design',
      'MERN Stack Development',
      'Frontend Development',
      'Backend Development',
      'Admin Panel Development',
      'Product Creation',
      'Product Titles & Descriptions',
      'Product Mockup Design',
      'Collection Architecture',
      'Cloudinary Media Setup',
      'WhatsApp Order Flow',
      'Technical SEO',
      'Structured Data (JSON-LD)',
      'Google Search Console Setup',
      'Performance Optimization',
    ],
    serviceIds: ['web', 'dashboard', 'content', 'ai', 'brand', 'ecomseo'],
    challenge:
      'Build a complete minimal luxury jewelry D2C website with a proper frontend, backend, admin panel, product catalog, Cloudinary media storage, WhatsApp ordering, and search-ready technical foundations. The biggest challenge was load time: jewelry product images were heavy, and the site needed to stay elegant without feeling slow.',
    strategy:
      'Designed the experience around quiet luxury, product clarity, and operational control. Built the platform on a MERN stack with an admin panel for managing products and collections, used Cloudinary for hosted media, shaped the catalog with SEO-friendly titles and descriptions, and improved load performance through caching and screen-size-aware image delivery.',
    solution:
      'Created the full D2C jewelry platform from branding and UI/UX through frontend, backend, admin tooling, product creation, collections, product copy, mockups, WhatsApp order flow, SEO, JSON-LD, and Google Search Console setup. After identifying image weight as the main performance issue, the site was optimized with caching and responsive image reduction so users receive appropriately sized visuals for their screen.',
    deliverables: [
      'Complete MERN e-commerce website',
      'Minimal luxury brand direction',
      'Responsive frontend experience',
      'Backend API architecture',
      'Admin panel for product and catalog control',
      'Cloudinary image storage setup',
      'Jewelry product creation',
      'Product titles and descriptions',
      'Product mockups',
      'Collection structure',
      'WhatsApp order flow',
      'Technical SEO',
      'JSON-LD structured data',
      'Google Search Console setup',
      'Image caching and responsive optimization',
      'Performance improvement pass',
    ],
    tools: [
      'MongoDB',
      'Express',
      'React',
      'Node.js',
      'Cloudinary',
      'Admin panel',
      'WhatsApp commerce',
      'Google Search Console',
      'JSON-LD schema',
      'Responsive image optimization',
      'Caching strategy',
    ],
    challenges: [
      'Create a luxury jewelry storefront that feels minimal, premium, and easy to browse.',
      'Build a full backend and admin panel so products, mockups, descriptions, and collections can be managed properly.',
      'Store and serve product images through Cloudinary while preserving visual quality.',
      'Fix slow loading caused by heavy jewelry images using cache and screen-size-aware image reduction.',
      'Connect the commerce journey to WhatsApp ordering while keeping SEO, JSON-LD, and Search Console foundations intact.',
    ],
    highlights: [
      'MERN full-stack build',
      'Admin panel and backend',
      'Cloudinary product media',
      'Minimal luxury UI/UX',
      'WhatsApp order flow',
      'SEO, JSON-LD and Search Console',
    ],
    integrations: [
      'Cloudinary media storage',
      'WhatsApp order journey',
      'Admin panel catalog management',
      'Google Search Console',
      'JSON-LD structured data',
      'Responsive image loading and caching',
    ],
    metrics: [
      { value: 'MERN', label: 'full stack build' },
      { value: 'Admin', label: 'catalog control' },
      { value: 'Cloud', label: 'image pipeline' },
      { value: 'Fast', label: 'cache + resize' },
    ],
    gallery: [
      {
        title: 'Minimal luxury storefront',
        label: 'UI/UX',
        imageUrl: kiraqStorefrontDesktop,
        mobileImageUrl: kiraqStorefrontMobile,
        description: 'A calm jewelry storefront designed around premium spacing, clean product focus, and a refined buying path.',
      },
      {
        title: 'Catalog and admin engine',
        label: 'MERN',
        imageUrl: kiraqCatalogDesktop,
        mobileImageUrl: kiraqProductMobile,
        description: 'A full backend and admin workflow for managing products, titles, descriptions, mockups, collections, and media.',
      },
      {
        title: 'Performance recovery',
        label: 'Speed',
        imageUrl: kiraqImageLoadDesktop,
        mobileImageUrl: kiraqImageLoadMobile,
        description: 'Heavy product imagery was optimized with caching and screen-size-aware image delivery to reduce load time.',
      },
    ],
    timeline: 'Full build',
    results:
      'Delivered a complete minimal luxury jewelry D2C platform with full-stack infrastructure, admin control, Cloudinary media handling, WhatsApp ordering, product content, SEO, JSON-LD, Search Console setup, and a resolved image-performance bottleneck.',
    testimonial:
      'A complete MERN-powered jewelry platform built from brand and product structure through backend, admin control, search foundations, and performance optimization.',
    heroImageAlt:
      'KIRAQ minimal luxury jewelry D2C website with MERN stack, admin panel, Cloudinary product images, WhatsApp ordering, SEO, JSON-LD, and performance optimization.',
    featured: true,
    isPlaceholder: false,
  },
  {
    slug: 'aegis-squad',
    title: 'Aegis Squad - Lean 5-Page Business Website',
    client: 'Aegis Squad',
    industry: 'Business Services / Lead Generation Website',
    projectUrl: 'https://aegissquad.com',
    imageUrl: aegisStorefrontDesktop,
    services: [
      'Budget Website Design',
      'Static Website Development',
      'HTML Development',
      'CSS Styling',
      'JavaScript Interactions',
      'Bootstrap Layout',
      'Custom Image Creation',
      'Contact Form Setup',
      'Dropdown Navigation',
      'Responsive Page Build',
    ],
    serviceIds: ['web', 'content', 'ai'],
    challenge:
      'Create a clean, credible website on a low client budget without overengineering the build. The project needed to cover the essential pages, present the brand clearly, include custom visuals, and make enquiries easy through a working contact form.',
    strategy:
      'Kept the stack intentionally simple with HTML, CSS, JavaScript, and Bootstrap so the site could be built quickly, remain easy to host, and stay within budget. Focused on practical navigation, clear page sections, lightweight custom images, dropdowns, and a direct contact path.',
    solution:
      'Designed and developed a simple 5-page business website using HTML, CSS, JavaScript, and Bootstrap. Built custom images, structured the pages for easy scanning, added dropdown navigation, created responsive layouts, and connected a contact form so visitors can send enquiries without extra friction.',
    deliverables: [
      '5-page static website',
      'HTML, CSS and JavaScript build',
      'Bootstrap responsive layout',
      'Custom website images',
      'Dropdown navigation',
      'Working contact form',
      'Mobile responsive sections',
      'Simple page content structure',
      'Lightweight frontend interactions',
      'Budget-conscious implementation',
    ],
    tools: [
      'HTML',
      'CSS',
      'JavaScript',
      'Bootstrap',
      'Custom images',
      'Contact form',
      'Dropdown menus',
      'Responsive layout',
    ],
    challenges: [
      'Keep the project affordable while still making the website feel complete and professional.',
      'Avoid unnecessary frameworks or backend complexity for a straightforward 5-page website.',
      'Create custom visuals and dropdown navigation within a lean implementation scope.',
      'Make the enquiry flow simple with a contact form instead of a heavy lead system.',
    ],
    highlights: [
      'Low-budget website build',
      '5-page static structure',
      'HTML, CSS, JavaScript and Bootstrap',
      'Custom images',
      'Dropdown navigation',
      'Contact form setup',
    ],
    integrations: [
      'Working contact form',
      'Dropdown navigation',
      'Custom image assets',
      'Bootstrap responsive grid',
      'Static hosting-friendly structure',
    ],
    metrics: [
      { value: '5', label: 'website pages' },
      { value: 'HTML', label: 'static build' },
      { value: 'Form', label: 'enquiry flow' },
      { value: 'Lean', label: 'budget scope' },
    ],
    gallery: [
      {
        title: 'Simple page system',
        label: 'Structure',
        imageUrl: aegisStorefrontDesktop,
        mobileImageUrl: aegisStorefrontMobile,
        description: 'A five-page website structure built to explain the business clearly without unnecessary complexity.',
      },
      {
        title: 'Custom visuals',
        label: 'Images',
        imageUrl: aegisImageDesktop,
        mobileImageUrl: aegisImageMobile,
        description: 'Custom website images were created to improve the look of a lean static build.',
      },
      {
        title: 'Enquiry path',
        label: 'Form',
        imageUrl: aegisEnquiryDesktop,
        mobileImageUrl: aegisEnquiryMobile,
        description: 'Dropdown navigation and a contact form make it easy for visitors to move through the site and send enquiries.',
      },
    ],
    timeline: 'Lean build',
    results:
      'Delivered a practical 5-page business website within a low-budget scope using HTML, CSS, JavaScript, Bootstrap, custom images, dropdowns, responsive layouts, and a working contact form.',
    testimonial:
      'A straightforward website build that respected the client budget while still covering the core pages, visuals, navigation, and enquiry flow.',
    heroImageAlt:
      'Aegis Squad 5-page business website built with HTML, CSS, JavaScript, Bootstrap, custom images, dropdown navigation, and a contact form.',
    featured: true,
    isPlaceholder: false,
  },
  {
    slug: 'mittal-architect',
    title: 'Mittal Architect - Static Architecture Studio Website',
    client: 'Mittal Architect',
    industry: 'Architecture / Interiors / Professional Services',
    projectUrl: 'https://mittalarchitect.in',
    imageUrl: mittalStorefrontDesktop,
    services: [
      'Architecture Website Design',
      'Static Website Development',
      'HTML Development',
      'CSS Styling',
      'JavaScript Interactions',
      'Bootstrap Layout',
      'jQuery Enhancements',
      'SEO Implementation',
      'AEO Optimization',
      'GEO Optimization',
      'JSON-LD Per Page',
      'Google Search Console Setup',
      'GA4 Setup',
      'Popup Interactions',
      'Gallery Build',
      'Contact Page Setup',
      'Iframe Embeds',
      'Motion Effects',
    ],
    serviceIds: ['web', 'content', 'ai', 'brand', 'ecomseo'],
    challenge:
      'Create a full 10-12 page architecture website without a backend while still supporting heavy project imagery, videos, gallery content, service pages, popups, motion effects, maps, YouTube, Instagram embeds, and search-ready structured data across pages.',
    strategy:
      'Kept the build static with HTML, CSS, JavaScript, Bootstrap, and jQuery for practical hosting and fast iteration. Structured each page around architecture credibility, service clarity, visual proof, and local search visibility while carefully handling heavy media and third-party iframes.',
    solution:
      'Designed and developed a 10-12 page static architecture website with service pages, gallery sections, contact page, custom illustrations, motion effects, popups, and embedded maps, YouTube, and Instagram content. Added SEO, AEO, GEO, Google Search Console, GA4 tracking, and JSON-LD structured data on each page without introducing backend complexity.',
    deliverables: [
      '10-12 page static website',
      'HTML, CSS, JavaScript, Bootstrap and jQuery build',
      'Architecture service pages',
      'Project gallery sections',
      'Heavy image and video presentation',
      'Custom illustrations',
      'Motion effects',
      'Popup interactions',
      'Contact page',
      'Google Maps iframe embeds',
      'YouTube iframe embeds',
      'Instagram iframe embeds',
      'SEO implementation',
      'AEO and GEO optimization',
      'JSON-LD structured data on each page',
      'Google Search Console setup',
      'GA4 analytics setup',
    ],
    tools: [
      'HTML',
      'CSS',
      'JavaScript',
      'Bootstrap',
      'jQuery',
      'Google Search Console',
      'GA4',
      'JSON-LD schema',
      'Google Maps iframe',
      'YouTube iframe',
      'Instagram embeds',
      'SEO, AEO and GEO',
    ],
    challenges: [
      'Present architecture work with heavy images and videos while keeping the site usable and clear.',
      'Build a full 10-12 page website without adding backend complexity.',
      'Support maps, YouTube, and Instagram embeds without letting third-party content dominate the experience.',
      'Add JSON-LD to every page and align SEO, AEO, and GEO foundations across the whole static site.',
      'Use popups, illustrations, gallery sections, and motion tastefully for a professional architecture brand.',
    ],
    highlights: [
      '10-12 page architecture website',
      'HTML, CSS, JS, Bootstrap and jQuery',
      'SEO, AEO and GEO setup',
      'JSON-LD on every page',
      'GSC and GA4 setup',
      'Maps, YouTube and Instagram embeds',
    ],
    integrations: [
      'Google Search Console',
      'GA4 analytics',
      'JSON-LD structured data',
      'Google Maps iframe',
      'YouTube iframe',
      'Instagram embeds',
      'Popup interactions',
    ],
    metrics: [
      { value: '12', label: 'static pages' },
      { value: 'SEO', label: 'AEO + GEO' },
      { value: 'GA4', label: 'analytics setup' },
      { value: 'Embed', label: 'maps + social' },
    ],
    gallery: [
      {
        title: 'Architecture page system',
        label: 'Pages',
        imageUrl: mittalStorefrontDesktop,
        mobileImageUrl: mittalStorefrontMobile,
        description: 'A 10-12 page static website structure built for services, credibility, contact, gallery, and project storytelling.',
      },
      {
        title: 'Media-heavy gallery',
        label: 'Gallery',
        imageUrl: mittalProjectsDesktop,
        mobileImageUrl: mittalProjectsMobile,
        description: 'Heavy images, videos, custom illustrations, and motion effects shaped into a visual architecture portfolio experience.',
      },
      {
        title: 'Search and embed layer',
        label: 'Growth',
        imageUrl: mittalPopupDesktop,
        mobileImageUrl: mittalPopupMobile,
        description: 'SEO, AEO, GEO, JSON-LD per page, GSC, GA4, maps, YouTube, Instagram embeds, and popups added without a backend.',
      },
    ],
    timeline: 'Static full build',
    results:
      'Delivered a complete static architecture website with 10-12 pages, service and gallery sections, heavy media presentation, contact page, popups, motion effects, JSON-LD on each page, SEO/AEO/GEO foundations, GSC, GA4, and third-party embeds for maps, YouTube, and Instagram.',
    testimonial:
      'A full static architecture website that combines portfolio visuals, service clarity, search foundations, analytics, embeds, and motion without backend overhead.',
    heroImageAlt:
      'Mittal Architect 10-12 page static architecture website built with HTML, CSS, JavaScript, Bootstrap, jQuery, SEO, AEO, GEO, JSON-LD, GA4, GSC, maps, YouTube, Instagram embeds, gallery, popups, and motion effects.',
    featured: true,
    isPlaceholder: false,
  },
];

export function getProjectBySlug(slug: string) {
  return portfolioProjects.find((p) => p.slug === slug);
}
