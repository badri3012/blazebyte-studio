import os

pages = {
    'src/app/page.tsx': {
        'title': 'Web, Marketing, AI & Apps',
        'desc': 'BlazeByte Studio is a premium software development company in Coimbatore, Tamil Nadu. We build high-performance websites, digital marketing systems, AI automation, and custom apps.',
        'canonical': '/'
    },
    'src/app/web/page.tsx': {
        'title': 'Web Development Company in Coimbatore',
        'desc': 'Get a high-performance, mobile-optimized website for your business. We are a premium web development company based in Coimbatore serving global clients.',
        'canonical': '/web'
    },
    'src/app/marketing/page.tsx': {
        'title': 'Digital Marketing Agency in Coimbatore',
        'desc': 'Data-driven digital marketing, SEO, and lead generation services in Coimbatore to scale your business and dominate search and social channels.',
        'canonical': '/marketing'
    },
    'src/app/ai/page.tsx': {
        'title': 'AI Automation Services for SMEs',
        'desc': 'Automate your workflows, customer service, and data triage with custom AI agents and enterprise automation systems by BlazeByte Studio.',
        'canonical': '/ai'
    },
    'src/app/apps/page.tsx': {
        'title': 'Custom Web App Development',
        'desc': 'Secure, scalable custom web applications, SaaS platforms, and internal business tools built by expert software engineers in Coimbatore.',
        'canonical': '/apps'
    },
    'src/app/services/seo/page.tsx': {
        'title': 'SEO Services in Coimbatore',
        'desc': 'Dominate search rankings with technical SEO, content strategy, and authoritative link building from Coimbatore\'s premier digital agency.',
        'canonical': '/services/seo'
    },
    'src/app/work/page.tsx': {
        'title': 'Website & Software Portfolio',
        'desc': 'Explore our selected case studies, web builds, and digital transformation projects delivered by BlazeByte Studio.',
        'canonical': '/work'
    },
    'src/app/contact/page.tsx': {
        'title': 'Contact BlazeByte Studio | Discuss Your Project',
        'desc': 'Get in touch with our Coimbatore-based team to discuss your next web, marketing, AI, or app development project.',
        'canonical': '/contact'
    }
}

for filepath, meta in pages.items():
    if not os.path.exists(filepath):
        print(f'File not found: {filepath}')
        continue
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'export const metadata' in content:
        print(f'Metadata already exists in {filepath}, skipping.')
        continue
    
    import_stmt = ''
    if 'import type { Metadata }' not in content and 'import { Metadata }' not in content:
        import_stmt = 'import type { Metadata } from \"next\";\n'
    
    meta_block = f'''
export const metadata: Metadata = {{
  title: \"{meta['title']}\",
  description: \"{meta['desc']}\",
  alternates: {{
    canonical: \"https://www.blazebyte.shop{meta['canonical']}\"
  }}
}};
'''
    
    lines = content.split('\n')
    last_import_idx = 0
    for i, line in enumerate(lines):
        if line.startswith('import '):
            last_import_idx = i
    
    lines.insert(last_import_idx + 1, import_stmt + meta_block)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))
    print(f'Added metadata to {filepath}')
