export interface InfographicPanel {
  title: string;
  desc: string;
  metric?: string;
  metricLabel?: string;
  tag?: string;
}

export interface InfographicSpec {
  promptNumber: number;
  title: string;
  subtitle: string;
  backgroundTheme: string;
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
    bg: string;
  };
  panels: [
    InfographicPanel,
    InfographicPanel,
    InfographicPanel,
    InfographicPanel,
    InfographicPanel,
    InfographicPanel
  ];
}

export interface ArticleAuthor {
  name: string;
  role: string;
  avatar: string;
  verifiedReviewer: string;
  date: string;
}

export interface BenchmarkRow {
  metric: string;
  itemA: string;
  itemB: string;
  itemC: string;
  verdict: string;
}

export interface ArticleSection {
  id: string;
  title: string;
  content: string;
  callout?: {
    type: 'spec' | 'tip' | 'warning' | 'benchmark';
    title: string;
    text: string;
  };
  steps?: Array<{
    step: number;
    title: string;
    instruction: string;
  }>;
}

export interface ArticleFAQ {
  question: string;
  answer: string;
}

export interface Article {
  id: string;
  title: string;
  keyword: string;
  category: 'Consumer Gadgets' | 'AI & Future Tech' | 'Cybersecurity & Software' | 'Smart Home & Computing';
  categorySlug: 'consumer-gadgets' | 'ai-future-tech' | 'cybersecurity-software' | 'smart-home-computing';
  author: ArticleAuthor;
  readTime: string;
  wordCount: number;
  publishDate: string;
  excerpt: string;
  imageSrc: string;
  infographic: InfographicSpec;
  keyTakeaways: string[];
  benchmarks: BenchmarkRow[];
  pros: string[];
  cons: string[];
  sections: ArticleSection[];
  faq: ArticleFAQ[];
  tags: string[];
  specsSummary: Record<string, string>;
}
