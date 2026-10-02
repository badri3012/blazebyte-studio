import os
import re

filepath = 'src/components/forms/project-configurator.tsx'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace budgetOptions array entirely
content = re.sub(
    r'const budgetOptions = \[.*?\];',
    'const budgetOptions = [\n    "\u20B915k - \u20B930k",\n    "\u20B930k - \u20B950k",\n    "\u20B950k - \u20B91L",\n    "\u20B91L - \u20B92L",\n    "\u20B92L+",\n  ];',
    content,
    flags=re.DOTALL
)

# Fix titles using regex matching '01 <weird chars> What'
content = re.sub(r'01[^A-Za-z0-9]+What', '01 - What', content)
content = re.sub(r'02[^A-Za-z0-9]+What', '02 - What', content)
content = re.sub(r'03[^A-Za-z0-9]+What', '03 - What', content)
content = re.sub(r'04[^A-Za-z0-9]+Tell', '04 - Tell', content)
content = re.sub(r'05[^A-Za-z0-9]+Provide', '05 - Provide', content)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print('Fixed encoding via regex')
