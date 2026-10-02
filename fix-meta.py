import os
import re

pages = {
    'src/app/page.tsx': '/',
    'src/app/web/page.tsx': '/web',
    'src/app/marketing/page.tsx': '/marketing',
    'src/app/ai/page.tsx': '/ai',
    'src/app/apps/page.tsx': '/apps',
    'src/app/work/page.tsx': '/work'
}

for filepath in pages.keys():
    if not os.path.exists(filepath): continue
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract metadata block if it exists
    meta_match = re.search(r'export const metadata: Metadata = \{.*?\};', content, re.DOTALL)
    if meta_match:
        meta_block = meta_match.group(0)
        # Remove from page
        content = content.replace(meta_block, '')
        content = content.replace('import type { Metadata } from "next";\n', '')
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content.strip() + '\n')
        
        # Create layout.tsx
        layout_path = os.path.join(os.path.dirname(filepath), 'layout.tsx')
        # Only if it is not the root layout
        if filepath != 'src/app/page.tsx':
            layout_content = f'''import type {{ Metadata }} from "next";

{meta_block}

export default function Layout({{ children }}: {{ children: React.ReactNode }}) {{
  return <>{{children}}</>;
}}
'''
            with open(layout_path, 'w', encoding='utf-8') as f:
                f.write(layout_content)
            print(f'Moved metadata to {layout_path}')
        else:
            print('Removed metadata from root page.tsx (should be in root layout.tsx)')
