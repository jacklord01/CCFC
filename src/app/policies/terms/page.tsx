import { PolicyLayout, SectionHeading, Paragraph } from "@/components/PolicyLayout";

export const metadata = { title: "Terms & Conditions – Castlebar Celtic FC" };

export default function TermsConditions() {
  return (
    <PolicyLayout title="Terms & Conditions" lastUpdated="January 2025">
      <Paragraph>
        Welcome to the official website of Castlebar Celtic Football Club. By accessing and using this website, you agree to comply with and be bound by the following Terms and Conditions.
      </Paragraph>
      <Paragraph>
        If you do not agree with these terms, please do not use this website.
      </Paragraph>

      <SectionHeading>1. Introduction</SectionHeading>
      <Paragraph>
        These terms govern your use of the Castlebar Celtic FC website and any services provided through it.
      </Paragraph>

      <SectionHeading>2. About Us</SectionHeading>
      <Paragraph>
        Castlebar Celtic FC is a football club based in Castlebar, County Mayo, Ireland, providing football activities for players of all ages and abilities.
      </Paragraph>

      <SectionHeading>3. Use of the Website</SectionHeading>
      <Paragraph>You agree to use this website for lawful purposes only. You must not:</Paragraph>
      <ul style={{ margin: "0 0 16px 0", paddingLeft: "24px", color: "#374151", lineHeight: "28px" }}>
        <li>Use the site in any way that breaches applicable laws or regulations</li>
        <li>Upload or share content that is abusive, defamatory, or inappropriate</li>
        <li>Attempt to gain unauthorised access to the website or its systems</li>
      </ul>

      <SectionHeading>4. Content and Information</SectionHeading>
      <Paragraph>
        All content provided on this website is for general information purposes only. While we aim to keep information accurate and up to date, Castlebar Celtic FC makes no guarantees regarding completeness or accuracy.
      </Paragraph>

      <SectionHeading>5. Membership, Events and Fundraising</SectionHeading>
      <Paragraph>The website may provide access to:</Paragraph>
      <ul style={{ margin: "0 0 16px 0", paddingLeft: "24px", color: "#374151", lineHeight: "28px" }}>
        <li>Club membership registration</li>
        <li>Event bookings</li>
        <li>Fundraising activities (e.g. lotto, raffles)</li>
      </ul>
      <Paragraph>
        Castlebar Celtic FC is responsible for the administration of these activities. Any participation is subject to the specific rules provided for each activity.
      </Paragraph>

      <SectionHeading>6. Intellectual Property</SectionHeading>
      <Paragraph>
        All website content, including text, images, logos, and branding, is the property of Castlebar Celtic FC unless otherwise stated. Content must not be copied or reproduced without permission.
      </Paragraph>

      <SectionHeading>7. External Links</SectionHeading>
      <Paragraph>
        This website may contain links to third-party websites. Castlebar Celtic FC is not responsible for the content or practices of external sites.
      </Paragraph>

      <SectionHeading>8. Limitation of Liability</SectionHeading>
      <Paragraph>
        Castlebar Celtic FC shall not be liable for any loss or damage arising from the use of this website.
      </Paragraph>

      <SectionHeading>9. Changes to These Terms</SectionHeading>
      <Paragraph>
        We may update these Terms and Conditions from time to time. Continued use of the website indicates acceptance of any changes.
      </Paragraph>

      <SectionHeading>10. Contact</SectionHeading>
      <Paragraph>
        For any queries regarding these Terms, please contact: <a href="mailto:pro@castlebarceltic.ie" style={{ color: "#008236" }}>pro@castlebarceltic.ie</a>
      </Paragraph>
    </PolicyLayout>
  );
}
