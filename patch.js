const fs = require('fs');
const content = fs.readFileSync('src/components/configurator/service-order-engine.tsx', 'utf8');
const regex = /<div className="space-y-2">\s*<input[\s\S]*?placeholder="Your Full Name \*"[\s\S]*?<input[\s\S]*?placeholder="Your Email Address \*"[\s\S]*?<\/div>/m;
const replacement = '<div className="space-y-3">\n' +
'  <input type="text" placeholder="Your Full Name *" value={clientName} onChange={e => setClientName(e.target.value)} className="w-full p-3 border text-xs text-[#17191C] bg-white" style={{ borderColor: palette.border }} />\n' +
'  <input type="text" placeholder="Business / Brand Name *" value={clientCompany} onChange={e => setClientCompany(e.target.value)} className="w-full p-3 border text-xs text-[#17191C] bg-white" style={{ borderColor: palette.border }} />\n' +
'  <input type="email" placeholder="Your Email Address *" value={clientEmail} onChange={e => setClientEmail(e.target.value)} className="w-full p-3 border text-xs text-[#17191C] bg-white" style={{ borderColor: palette.border }} />\n' +
'  <input type="tel" placeholder="WhatsApp / Phone (Optional)" value={clientWhatsapp} onChange={e => setClientWhatsapp(e.target.value)} className="w-full p-3 border text-xs text-[#17191C] bg-white" style={{ borderColor: palette.border }} />\n' +
'</div>\n' +
'{errorMessage && <div className="text-red-600 text-xs font-bold p-3 border border-red-600 bg-red-50 mt-2 mb-2">{errorMessage}</div>}';
if (regex.test(content)) {
    const newContent = content.replace(regex, replacement);
    fs.writeFileSync('src/components/configurator/service-order-engine.tsx', newContent, 'utf8');
    console.log('Success!');
} else {
    console.log('Pattern not found');
}
