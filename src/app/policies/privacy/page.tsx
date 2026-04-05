import { PolicyLayout, SectionHeading, Paragraph } from "@/components/PolicyLayout";

export const metadata = { title: "Privacy Policy – Castlebar Celtic FC" };

export default function PrivacyPolicy() {
  return (
    <PolicyLayout title="Privacy Policy" lastUpdated="January 2025">
      <Paragraph>
        Castlebar Celtic FC is committed to protecting and respecting your privacy. This Privacy Policy explains how we collect, use, and protect your personal data in accordance with the General Data Protection Regulation (GDPR) and Irish data protection laws.
      </Paragraph>

      <SectionHeading>1. Who We Are</SectionHeading>
      <Paragraph>
        Castlebar Celtic FC, Pavilion Road, Castlebar, County Mayo, F23 PF62, Ireland.<br />
        Email: <a href="mailto:pro@castlebarceltic.ie" style={{ color: "#008236" }}>pro@castlebarceltic.ie</a><br />
        For the purposes of data protection law, Castlebar Celtic FC is the Data Controller of your personal data.
      </Paragraph>

      <SectionHeading>2. Personal Data We Collect</SectionHeading>
      <Paragraph>We may collect and process the following types of personal data:</Paragraph>
      <ul style={{ margin: "0 0 16px 0", paddingLeft: "24px", color: "#374151", lineHeight: "28px" }}>
        <li>Name and contact details (email, phone number)</li>
        <li>Player registration details (including date of birth for youth players)</li>
        <li>Parent/guardian details and emergency contact information</li>
        <li>Payment and transaction details (where applicable)</li>
        <li>Photographs and video (where consent is provided)</li>
        <li>Website usage data (cookies and analytics)</li>
      </ul>

      <SectionHeading>3. How We Use Your Data</SectionHeading>
      <ul style={{ margin: "0 0 16px 0", paddingLeft: "24px", color: "#374151", lineHeight: "28px" }}>
        <li>Manage club membership and registrations</li>
        <li>Organise training, matches, and events</li>
        <li>Communicate important club information</li>
        <li>Administer fundraising activities</li>
        <li>Ensure safeguarding and welfare of members</li>
        <li>Comply with legal and regulatory obligations</li>
      </ul>

      <SectionHeading>4. Lawful Basis for Processing</SectionHeading>
      <ul style={{ margin: "0 0 16px 0", paddingLeft: "24px", color: "#374151", lineHeight: "28px" }}>
        <li>Consent (e.g. media usage)</li>
        <li>Contract (e.g. membership registration)</li>
        <li>Legal obligation</li>
        <li>Legitimate interests (running the club effectively)</li>
      </ul>

      <SectionHeading>5. Sharing of Data</SectionHeading>
      <Paragraph>We may share data with governing bodies (e.g. FAI, leagues), service providers (e.g. payment processors), and authorities where required by law. We do not sell personal data.</Paragraph>

      <SectionHeading>6. Data Retention</SectionHeading>
      <ul style={{ margin: "0 0 16px 0", paddingLeft: "24px", color: "#374151", lineHeight: "28px" }}>
        <li>Membership data: duration of membership plus a reasonable period</li>
        <li>Safeguarding records: in line with legal guidance</li>
        <li>Financial records: as required by law</li>
      </ul>

      <SectionHeading>7. Your Rights</SectionHeading>
      <Paragraph>Under GDPR, you have the right to: access your personal data; request correction of inaccurate data; request deletion (where applicable); restrict or object to processing; data portability; and withdraw consent at any time. Requests can be made to <a href="mailto:pro@castlebarceltic.ie" style={{ color: "#008236" }}>pro@castlebarceltic.ie</a>.</Paragraph>

      <SectionHeading>8. Data Security</SectionHeading>
      <Paragraph>We take appropriate technical and organisational measures to protect personal data against unauthorised access, loss, or misuse.</Paragraph>

      <SectionHeading>9. Cookies</SectionHeading>
      <Paragraph>Our website uses cookies to improve user experience. Please refer to our <a href="/policies/cookie" style={{ color: "#008236" }}>Cookie Policy</a> for further details.</Paragraph>

      <SectionHeading>10. Contact</SectionHeading>
      <Paragraph>For questions about this policy: <a href="mailto:pro@castlebarceltic.ie" style={{ color: "#008236" }}>pro@castlebarceltic.ie</a> or phone <a href="tel:0871924100" style={{ color: "#008236" }}>087 192 4100</a>.</Paragraph>
    </PolicyLayout>
  );
}
