import os

filepath = 'src/components/forms/project-configurator.tsx'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix Rupees
content = content.replace(',15k', '\u20B95k')
content = content.replace(',115k', '\u20B915k')
content = content.replace(',130k', '\u20B930k')
content = content.replace(',150k', '\u20B950k')
content = content.replace(',11L', '\u20B91L')

# Fix corrupted dash in ranges
content = content.replace('k?",1', 'k - \u20B9')

# Fix corrupted dash in titles
content = content.replace('01 ?" What', '01 - What')
content = content.replace('02 ?" What', '02 - What')
content = content.replace('03 ?" What', '03 - What')
content = content.replace('04 ?" Tell', '04 - Tell')
content = content.replace('05 ?" Provide', '05 - Provide')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print('Fixed encoding in project-configurator.tsx')
