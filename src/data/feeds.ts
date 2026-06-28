export type FeedCategory =
  | 'all'
  | 'windows'
  | 'powershell'
  | 'identity'
  | 'vmware'
  | 'cisco'
  | 'security'
  | 'automation'
  | 'devops'
  | 'cloud'
  | 'containers'
  | 'observability'
  | 'linux'
  | 'network'
  | 'general';

export interface FeedSource {
  id: string;
  name: string;
  url: string;
  category: FeedCategory;
  color: string;
  siteUrl: string;
}

export interface FeedCategoryMeta {
  id: FeedCategory;
  label: string;
  description: string;
  icon: string;
}

export interface FeedArticle {
  id: string;
  title: string;
  link: string;
  excerpt: string;
  published: Date | null;
  sourceId: string;
  sourceName: string;
  category: FeedCategory;
  color: string;
}

export const categories: FeedCategoryMeta[] = [
  { id: 'all', label: 'All Feeds', description: 'Latest across every source', icon: '◉' },
  { id: 'windows', label: 'Windows', description: 'Windows Server, patches, and admin news', icon: '⊞' },
  { id: 'powershell', label: 'PowerShell', description: 'Scripting, modules, and automation', icon: '>' },
  { id: 'identity', label: 'Identity & AD', description: 'Active Directory, Entra ID, hybrid identity', icon: '◎' },
  { id: 'vmware', label: 'VMware', description: 'vSphere, ESXi, and virtualization', icon: '⬡' },
  { id: 'cisco', label: 'Cisco / UCS', description: 'UCS, Nexus, and data center networking', icon: '⬢' },
  { id: 'security', label: 'Security', description: 'CrowdStrike, threats, and endpoint protection', icon: '◆' },
  { id: 'automation', label: 'Automation', description: 'Ansible, Terraform, and IaC', icon: '⟳' },
  { id: 'devops', label: 'DevOps', description: 'GitHub, CI/CD, and platform engineering', icon: '⎇' },
  { id: 'cloud', label: 'Cloud / Azure', description: 'Azure, AWS, and hybrid cloud', icon: '☁' },
  { id: 'containers', label: 'Containers', description: 'Docker, Kubernetes, and orchestration', icon: '⬢' },
  { id: 'observability', label: 'Observability', description: 'Grafana, Splunk, monitoring', icon: '◉' },
  { id: 'linux', label: 'Linux', description: 'RHEL, Ubuntu, and open-source ops', icon: '◈' },
  { id: 'network', label: 'Network', description: 'Cisco, routing, and network security', icon: '⇄' },
  { id: 'general', label: 'Industry', description: 'Broad IT and data center news', icon: '▣' },
];

/** Verified public RSS/Atom feeds from vendor blogs and IT news outlets */
export const feedSources: FeedSource[] = [
  // Windows & Microsoft
  {
    id: 'ms-security',
    name: 'Microsoft Security',
    url: 'https://www.microsoft.com/en-us/security/blog/feed/',
    category: 'windows',
    color: '#0078d4',
    siteUrl: 'https://www.microsoft.com/en-us/security/blog/',
  },
  {
    id: 'ms-techcommunity',
    name: 'Microsoft Tech Community',
    url: 'https://techcommunity.microsoft.com/t5/s/gxcuf89792/rss/Community',
    category: 'windows',
    color: '#0078d4',
    siteUrl: 'https://techcommunity.microsoft.com/',
  },
  {
    id: 'windows-latest',
    name: 'Windows Latest',
    url: 'https://www.windowslatest.com/feed/',
    category: 'windows',
    color: '#0078d4',
    siteUrl: 'https://www.windowslatest.com/',
  },

  // PowerShell
  {
    id: 'ms-powershell-blog',
    name: 'PowerShell Team Blog',
    url: 'https://devblogs.microsoft.com/powershell/feed/',
    category: 'powershell',
    color: '#012456',
    siteUrl: 'https://devblogs.microsoft.com/powershell/',
  },
  {
    id: 'powershell-team-gh',
    name: 'PowerShell GitHub Releases',
    url: 'https://github.com/PowerShell/PowerShell/releases.atom',
    category: 'powershell',
    color: '#012456',
    siteUrl: 'https://github.com/PowerShell/PowerShell/releases',
  },

  // Identity & AD
  {
    id: 'ms-identity',
    name: 'Microsoft Identity Blog',
    url: 'https://devblogs.microsoft.com/identity/feed/',
    category: 'identity',
    color: '#818cf8',
    siteUrl: 'https://devblogs.microsoft.com/identity/',
  },
  {
    id: 'ms-security-id',
    name: 'Microsoft Security (Identity)',
    url: 'https://www.microsoft.com/en-us/security/blog/feed/',
    category: 'identity',
    color: '#818cf8',
    siteUrl: 'https://www.microsoft.com/en-us/security/blog/',
  },

  // VMware
  {
    id: 'vmware-blog',
    name: 'VMware Blog',
    url: 'https://blogs.vmware.com/feed',
    category: 'vmware',
    color: '#607078',
    siteUrl: 'https://blogs.vmware.com/',
  },
  {
    id: 'virtuallyghetto',
    name: 'Virtually Ghetto',
    url: 'https://www.virtuallyghetto.com/feeds/posts/default',
    category: 'vmware',
    color: '#607078',
    siteUrl: 'https://www.virtuallyghetto.com/',
  },

  // Cisco
  {
    id: 'cisco-datacenter',
    name: 'Cisco Data Center',
    url: 'https://blogs.cisco.com/datacenter/feed',
    category: 'cisco',
    color: '#049fd9',
    siteUrl: 'https://blogs.cisco.com/datacenter',
  },
  {
    id: 'cisco-main',
    name: 'Cisco Blogs',
    url: 'https://blogs.cisco.com/feed',
    category: 'cisco',
    color: '#049fd9',
    siteUrl: 'https://blogs.cisco.com/',
  },

  // Security / CrowdStrike
  {
    id: 'crowdstrike',
    name: 'CrowdStrike Blog',
    url: 'https://www.crowdstrike.com/blog/feed/',
    category: 'security',
    color: '#e00000',
    siteUrl: 'https://www.crowdstrike.com/blog/',
  },
  {
    id: 'bleepingcomputer',
    name: 'BleepingComputer',
    url: 'https://www.bleepingcomputer.com/feed/',
    category: 'security',
    color: '#ef4444',
    siteUrl: 'https://www.bleepingcomputer.com/',
  },
  {
    id: 'krebs',
    name: 'Krebs on Security',
    url: 'https://krebsonsecurity.com/feed/',
    category: 'security',
    color: '#ef4444',
    siteUrl: 'https://krebsonsecurity.com/',
  },
  {
    id: 'darkreading',
    name: 'Dark Reading',
    url: 'https://www.darkreading.com/rss.xml',
    category: 'security',
    color: '#ef4444',
    siteUrl: 'https://www.darkreading.com/',
  },

  // Automation
  {
    id: 'ansible',
    name: 'Red Hat Ansible',
    url: 'https://www.ansible.com/rss/blog.xml',
    category: 'automation',
    color: '#ee0000',
    siteUrl: 'https://www.ansible.com/blog',
  },
  {
    id: 'hashicorp',
    name: 'HashiCorp Blog',
    url: 'https://www.hashicorp.com/blog/feed.xml',
    category: 'automation',
    color: '#7b42bc',
    siteUrl: 'https://www.hashicorp.com/blog',
  },

  // DevOps / GitHub
  {
    id: 'github-blog',
    name: 'GitHub Blog',
    url: 'https://github.blog/feed/',
    category: 'devops',
    color: '#ffffff',
    siteUrl: 'https://github.blog/',
  },
  {
    id: 'devops-com',
    name: 'DevOps.com',
    url: 'https://devops.com/feed/',
    category: 'devops',
    color: '#e879f9',
    siteUrl: 'https://devops.com/',
  },

  // Cloud / Azure
  {
    id: 'azure-blog',
    name: 'Azure Blog',
    url: 'https://azure.microsoft.com/en-us/blog/feed/',
    category: 'cloud',
    color: '#0078d4',
    siteUrl: 'https://azure.microsoft.com/en-us/blog/',
  },
  {
    id: 'aws-news',
    name: 'AWS News Blog',
    url: 'https://aws.amazon.com/blogs/aws/feed/',
    category: 'cloud',
    color: '#ff9900',
    siteUrl: 'https://aws.amazon.com/blogs/aws/',
  },

  // Containers
  {
    id: 'kubernetes',
    name: 'Kubernetes Blog',
    url: 'https://kubernetes.io/feed.xml',
    category: 'containers',
    color: '#326ce5',
    siteUrl: 'https://kubernetes.io/blog/',
  },
  {
    id: 'docker',
    name: 'Docker Blog',
    url: 'https://www.docker.com/blog/feed/',
    category: 'containers',
    color: '#2496ed',
    siteUrl: 'https://www.docker.com/blog/',
  },
  {
    id: 'cncf',
    name: 'CNCF Blog',
    url: 'https://www.cncf.io/blog/feed/',
    category: 'containers',
    color: '#326ce5',
    siteUrl: 'https://www.cncf.io/blog/',
  },

  // Observability
  {
    id: 'grafana',
    name: 'Grafana Labs',
    url: 'https://grafana.com/blog/index.xml',
    category: 'observability',
    color: '#f46800',
    siteUrl: 'https://grafana.com/blog/',
  },
  {
    id: 'datadog',
    name: 'Datadog Blog',
    url: 'https://www.datadoghq.com/blog/index.xml',
    category: 'observability',
    color: '#632ca6',
    siteUrl: 'https://www.datadoghq.com/blog/',
  },

  // Linux
  {
    id: 'redhat',
    name: 'Red Hat Blog',
    url: 'https://www.redhat.com/en/rss/blog',
    category: 'linux',
    color: '#ee0000',
    siteUrl: 'https://www.redhat.com/en/blog',
  },
  {
    id: 'ubuntu',
    name: 'Ubuntu Blog',
    url: 'https://ubuntu.com/blog/feed',
    category: 'linux',
    color: '#e95420',
    siteUrl: 'https://ubuntu.com/blog',
  },

  // Network
  {
    id: 'cisco-network',
    name: 'Cisco Networking Blog',
    url: 'https://blogs.cisco.com/networking/feed',
    category: 'network',
    color: '#049fd9',
    siteUrl: 'https://blogs.cisco.com/networking',
  },

  // General IT industry
  {
    id: 'theregister',
    name: 'The Register',
    url: 'https://www.theregister.com/headlines.atom',
    category: 'general',
    color: '#fbbf24',
    siteUrl: 'https://www.theregister.com/',
  },
  {
    id: 'ars-technica',
    name: 'Ars Technica',
    url: 'https://feeds.arstechnica.com/arstechnica/technology-lab',
    category: 'general',
    color: '#fbbf24',
    siteUrl: 'https://arstechnica.com/',
  },
  {
    id: 'zdnet-cloud',
    name: 'ZDNet Cloud',
    url: 'https://www.zdnet.com/topic/cloud/rss.xml',
    category: 'general',
    color: '#fbbf24',
    siteUrl: 'https://www.zdnet.com/',
  },
];

export function getCategoryMeta(id: FeedCategory): FeedCategoryMeta {
  return categories.find((c) => c.id === id) ?? categories[0];
}

export function getSourcesByCategory(category: FeedCategory): FeedSource[] {
  if (category === 'all') return feedSources;
  return feedSources.filter((f) => f.category === category);
}
