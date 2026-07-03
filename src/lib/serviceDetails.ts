export type ServiceDetail = {
  slug: string;
  title: string;
  summary: string;
  body: string[];
};

export const SERVICE_DETAILS: ServiceDetail[] = [
  {
    slug: 'web-development',
    title: 'Web Development',
    summary: 'Custom web applications built for performance, security, and scale.',
    body: [
      'We design and develop modern web platforms using proven frameworks and cloud-ready architectures.',
      'From marketing sites to complex business applications, Giventa helps you launch faster with maintainable code.',
    ],
  },
  {
    slug: 'mobile-development',
    title: 'Mobile Development',
    summary: 'Native and cross-platform mobile apps for iOS and Android.',
    body: [
      'Our mobile team builds reliable apps with intuitive UX and secure backend integration.',
      'We support full lifecycle delivery from discovery through deployment and ongoing updates.',
    ],
  },
  {
    slug: 'ui-ux-design',
    title: 'UI/UX Design',
    summary: 'User-centered design that improves engagement and conversion.',
    body: [
      'We create wireframes, prototypes, and polished interfaces aligned with your brand and user goals.',
      'Design systems and usability testing help ensure every release meets real user needs.',
    ],
  },
  {
    slug: 'qa-testing',
    title: 'QA & Testing',
    summary: 'Comprehensive quality assurance across web, mobile, and API layers.',
    body: [
      'Giventa provides manual and automated testing to reduce defects before production release.',
      'Regression, performance, and security testing are integrated into your delivery workflow.',
    ],
  },
  {
    slug: 'it-consultancy',
    title: 'IT Consultancy',
    summary: 'Strategic guidance to modernize systems and optimize IT operations.',
    body: [
      'We assess your current stack, identify risks, and recommend practical modernization paths.',
      'Our consultants work alongside your team to implement changes with minimal disruption.',
    ],
  },
  {
    slug: 'dedicated-team',
    title: 'Dedicated Team',
    summary: 'Extended engineering capacity aligned to your roadmap.',
    body: [
      'Scale delivery with a dedicated Giventa team that integrates with your processes and tools.',
      'Flexible engagement models support short-term sprints or long-term product development.',
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return SERVICE_DETAILS.find((service) => service.slug === slug);
}
