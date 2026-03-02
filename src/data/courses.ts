export type ProgramCategory = 'US CMA' | 'FMAA' | 'CSCA' | 'Excel & Finance'

export type SubscriptionType = 'short' | 'long'

export type CourseItem = {
  id: string
  title: string
  category: ProgramCategory
  description: string
  priceDisplay: string
  isSale?: boolean
  originalPriceDisplay?: string
  // Optional backend mapping for enrolments
  backendSlug?: 'us-cma' | 'fmaa' | 'csca' | 'excel' | 'intro'
  subscriptionType?: SubscriptionType
}

export const introSessions: CourseItem[] = [
  {
    id: 'intro-7mar-aest',
    title: 'Info Session - 7 Mar 2026 – 5 pm AEST / 6 am UTC',
    category: 'US CMA',
    description: 'FREE live webinar on the US CMA certification.',
    priceDisplay: 'USD 0.00',
    backendSlug: 'intro',
    subscriptionType: 'short',
  },
  {
    id: 'intro-8mar-aest',
    title: 'Info Session - 8 Mar 2026 – 5 pm AEST / 6 am UTC',
    category: 'US CMA',
    description: 'FREE live webinar on the US CMA certification.',
    priceDisplay: 'USD 0.00',
    backendSlug: 'intro',
    subscriptionType: 'short',
  },
]

export const enrolCourses: CourseItem[] = [
  ...introSessions,
  {
    id: 'fmaa-fast-track',
    title: 'FMAA - Fast Track (6 sessions)',
    category: 'FMAA',
    description:
      'Simplified Finance in 6 focused sessions — finance made simple, decisions made smarter.',
    priceDisplay: 'USD 399.00',
    backendSlug: 'fmaa',
    subscriptionType: 'long',
  },
  {
    id: 'fmaa-regular',
    title: 'FMAA - Regular (15 sessions)',
    category: 'FMAA',
    description:
      'A 15-session journey into simplified finance with case studies, stories, and practical tools.',
    priceDisplay: 'USD 399.00',
    backendSlug: 'fmaa',
    subscriptionType: 'long',
  },
  {
    id: 'leases-ifrs16',
    title: 'Leases (IFRS 16)',
    category: 'Excel & Finance',
    description:
      'Focused 3-hour session explaining IFRS 16 and demonstrating Excel-based lease calculations.',
    priceDisplay: 'USD 99.00',
    backendSlug: 'excel',
    subscriptionType: 'short',
  },
  {
    id: 'excel-in-finance',
    title: 'Excel in Finance',
    category: 'Excel & Finance',
    description:
      'Practical Excel in Finance skills to help you make a meaningful impact in your organisation.',
    priceDisplay: 'USD 99.00',
    backendSlug: 'excel',
    subscriptionType: 'short',
  },
  {
    id: 'us-cma-fasttrack-both-jan',
    title: 'US CMA Part 1&2 Fast Track - Jan 2026 Intake',
    category: 'US CMA',
    description:
      'The global gold standard for finance professionals – intensive 4-month fast track for both parts.',
    priceDisplay: 'Sale: USD 1,199.00',
    isSale: true,
    originalPriceDisplay: 'USD 1,499.00',
    backendSlug: 'us-cma',
    subscriptionType: 'long',
  },
  {
    id: 'us-cma-fasttrack-part2-jan',
    title: 'US CMA Part 2 Fast Track - Jan 2026 Intake',
    category: 'US CMA',
    description:
      'Part 2: Strategic Financial Management – 4-month fast track with live weekly classes.',
    priceDisplay: 'Sale: USD 639.00',
    isSale: true,
    originalPriceDisplay: 'USD 799.00',
    backendSlug: 'us-cma',
    subscriptionType: 'long',
  },
  {
    id: 'us-cma-fasttrack-part1-jan',
    title: 'US CMA Part 1 Fast Track - Jan 2026 Intake',
    category: 'US CMA',
    description:
      'Part 1: Financial Planning, Performance, and Analytics – 4-month fast track with live weekly classes.',
    priceDisplay: 'Sale: USD 639.00',
    isSale: true,
    originalPriceDisplay: 'USD 799.00',
    backendSlug: 'us-cma',
    subscriptionType: 'long',
  },
  {
    id: 'us-cma-regular-both-mar',
    title: 'US CMA Part 1&2 Regular - March 2026 Intake',
    category: 'US CMA',
    description:
      '6-month regular track for both CMA parts with one year of support and weekly classes.',
    priceDisplay: 'Sale: USD 1,199.00',
    isSale: true,
    originalPriceDisplay: 'USD 1,499.00',
    backendSlug: 'us-cma',
    subscriptionType: 'long',
  },
  {
    id: 'us-cma-regular-part2-mar',
    title: 'US CMA Part 2 Regular - March 2026 Intake',
    category: 'US CMA',
    description:
      'Part 2: Strategic Financial Management – 6-month regular program with global-standard content.',
    priceDisplay: 'Sale: USD 639.00',
    isSale: true,
    originalPriceDisplay: 'USD 799.00',
    backendSlug: 'us-cma',
    subscriptionType: 'long',
  },
  {
    id: 'us-cma-regular-part1-mar',
    title: 'US CMA Part 1 Regular - March 2026 Intake',
    category: 'US CMA',
    description:
      'Part 1: Financial Planning, Performance, and Analytics – 6-month regular program with support.',
    priceDisplay: 'Sale: USD 639.00',
    isSale: true,
    originalPriceDisplay: 'USD 799.00',
    backendSlug: 'us-cma',
    subscriptionType: 'long',
  },
]

