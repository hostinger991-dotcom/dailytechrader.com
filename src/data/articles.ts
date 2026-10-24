import { Article } from '../types/article';
import { category1Articles } from './category1_gadgets';
import { category2Articles } from './category2_ai';
import { category3Articles } from './category3_cybersecurity';
import { category4Articles } from './category4_smarthome';

export const allArticles: Article[] = [
  ...category1Articles,
  ...category2Articles,
  ...category3Articles,
  ...category4Articles,
];

export const categories = [
  {
    name: 'Consumer Gadgets',
    slug: 'consumer-gadgets',
    count: 6,
    tagline: 'Hardware teardowns, silicon benchmarks, mobile optics & battery testing',
    color: '#00f0ff'
  },
  {
    name: 'AI & Future Tech',
    slug: 'ai-future-tech',
    count: 6,
    tagline: 'Diffusion transformers, enterprise agents, autonomous drones & humanoid robotics',
    color: '#ff007f'
  },
  {
    name: 'Cybersecurity & Software',
    slug: 'cybersecurity-software',
    count: 5,
    tagline: 'Zero-knowledge encryption, WireGuard tunnels, EDR heuristics & OS optimization',
    color: '#00ff66'
  },
  {
    name: 'Smart Home & Computing',
    slug: 'smart-home-computing',
    count: 5,
    tagline: 'Matter over Thread, PCIe 5.0 systems, PoE surveillance & inverter thermodynamics',
    color: '#ffd700'
  }
];

export const tickerHeadlines = [
  { tag: 'FOLDABLE LABS', text: 'Waterdrop Hinge Durability Tests Confirm 400,000 Flex Cycles with Sub-0.11mm Crease Depths', link: 'foldable-phone-hinge-durability-test' },
  { tag: 'EDGE AI SILICON', text: '45+ TOPS Mobile NPUs Execute 8B INT4 Models at 24 Tokens/Sec Under 4W Power Budgets', link: 'small-language-models-on-device-npu' },
  { tag: 'BREAKING HARDWARE', text: '3nm Foundry Yields Surge: Next-Gen Flagships Surpass 10,800 Multi-Core Scores', link: 'best-flagship-smartphone-deals' },
  { tag: 'AI BENCHMARKS', text: 'Diffusion Transformers Eliminate Synthetic Rendering Artifacts in Real-Time 4K Video', link: 'latest-generative-ai-tools' },
  { tag: 'SECURITY ALERT', text: 'Zero-Knowledge Passkeys Standardized Across Major Mobile and Desktop OS Platforms', link: 'secure-password-manager-comparison' },
  { tag: 'SMART HOME', text: 'Thread 1.4 Specification Deploys Automated Interoperability Across Multi-Vendor Border Routers', link: 'best-smart-home-hubs' },
  { tag: 'ENERGY TECH', text: 'Variable-Speed Inverter Heat Pumps Exceed 4.2 COP Efficiency in Sub-Zero Arctic Lab Tests', link: 'energy-saving-smart-appliances' },
  { tag: 'ACOUSTICS', text: 'Sub-20 Microsecond DSP Loops Achieve Record -48dB Active Noise Cancellation in TWS Earbuds', link: 'wireless-noise-canceling-earbuds' },
  { tag: 'SYSTEMS TUNING', text: 'Windows Kernel Tracing Confirms Static Virtual Memory Allocation Halts NVMe Thrashing', link: 'how-to-speed-up-windows-pc' },
  { tag: 'AEROSPACE AI', text: 'Solid-State MEMS LiDAR Eliminates Moving Parts in Industrial Autonomous Drone Inspection Swarms', link: 'autonomous-drone-technology-trends' }
];

export function getArticleById(id: string): Article | undefined {
  return allArticles.find(a => a.id === id);
}

export function getArticlesByCategory(categorySlug: string): Article[] {
  return allArticles.filter(a => a.categorySlug === categorySlug);
}
