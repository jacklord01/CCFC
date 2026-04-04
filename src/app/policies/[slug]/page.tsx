import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return [
    { slug: 'terms-and-conditions' },
    { slug: 'cookie-policy' },
    { slug: 'child-safeguarding' },
    { slug: 'gdpr' },
    { slug: 'lotto-terms' },
    { slug: 'code-of-conduct' },
    { slug: 'photography-consent' },
  ];
}

export default async function PolicyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const policiesDir = path.join(process.cwd(), 'src', 'content', 'policies');
  
  let content = "";
  let title = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  if (title === 'Gdpr') title = 'GDPR Privacy Policy';
  if (title === 'Lotto Terms') title = 'Lotto Fundraising Terms';

  try {
     const txtPath = path.join(policiesDir, `${slug}.txt`);
     if (fs.existsSync(txtPath)) {
         content = fs.readFileSync(txtPath, 'utf8');
     } else if (slug === 'terms-and-conditions') {
         content = `## Terms & Conditions – Castlebar Celtic FC

### 1. Introduction
Welcome to the official website of Castlebar Celtic Football Club. By accessing and using this website, you agree to comply with and be bound by the following Terms and Conditions.
If you do not agree with these terms, please do not use this website.

### 2. About Us
Castlebar Celtic FC is a football club based in Castlebar, County Mayo, Ireland, providing football activities for players of all ages and abilities.

### 3. Use of the Website
You agree to use this website for lawful purposes only. You must not:
* Use the site in any way that breaches applicable laws or regulations
* Upload or share content that is abusive, defamatory, or inappropriate
* Attempt to gain unauthorised access to the website or its systems

### 4. Content and Information
All content provided on this website is for general information purposes only. While we aim to keep information accurate and up to date, Castlebar Celtic FC makes no guarantees regarding completeness or accuracy.

### 5. Membership, Events and Fundraising
The website may provide access to:
* Club membership registration
* Event bookings
* Fundraising activities (e.g. lotto, raffles)
Castlebar Celtic FC is responsible for the administration of these activities. Any participation is subject to the specific rules provided for each activity.

### 6. Intellectual Property
All website content, including text, images, logos, and branding, is the property of Castlebar Celtic FC unless otherwise stated. Content must not be copied or reproduced without permission.

### 7. External Links
This website may contain links to third-party websites. Castlebar Celtic FC is not responsible for the content or practices of external sites.

### 8. Limitation of Liability
Castlebar Celtic FC shall not be liable for any loss or damage arising from the use of this website.

### 9. Changes to These Terms
We may update these Terms and Conditions from time to time. Continued use of the website indicates acceptance of any changes.

### 10. Contact
For any queries regarding these Terms, please contact: pro@castlebarceltic.ie`;
     } else {
         return notFound();
     }
  } catch (e) {
     return notFound();
  }

  // Very basic Markdown to formatting wrapper
  const formattedContent = content.split('\n').map((line, i) => {
    if (line.startsWith('### ')) return <h3 key={i} style={{ marginTop: "1.5rem" }}>{line.replace('### ', '')}</h3>;
    if (line.startsWith('## ')) return <h2 key={i} style={{ marginTop: "2rem" }}>{line.replace('## ', '')}</h2>;
    if (line.startsWith('* ')) return <li key={i} style={{ marginLeft: "2rem" }}>{line.replace('* ', '')}</li>;
    if (line.trim() === '---') return <hr key={i} style={{ margin: "1.5rem 0", borderColor: "var(--border-color)" }} />;
    return <p key={i} style={{ marginBottom: "0.75rem" }}>{line}</p>;
  });

  return (
    <div className="container section">
       <div style={{ maxWidth: "800px", margin: "0 auto" }}>
         <h1 style={{ marginBottom: "2rem", textAlign: "center" }}>{title}</h1>
         <div className="card" style={{ padding: "3rem" }}>
             {formattedContent}
         </div>
       </div>
    </div>
  )
}
