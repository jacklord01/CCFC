import { PolicyLayout, SectionHeading, Paragraph } from "@/components/PolicyLayout";

export const metadata = { title: "Cookie Policy – Castlebar Celtic FC" };

export default function CookiePolicy() {
  return (
    <PolicyLayout title="Cookie Policy" lastUpdated="January 2025">
      <Paragraph>
        This Cookie Policy explains how Castlebar Celtic FC uses cookies and similar technologies on our website.
      </Paragraph>

      <SectionHeading>1. What Are Cookies</SectionHeading>
      <Paragraph>
        Cookies are small text files stored on your device when you visit a website. They help improve functionality and user experience.
      </Paragraph>

      <SectionHeading>2. Types of Cookies We Use</SectionHeading>

      <h3 style={{ fontFamily: "Inter, sans-serif", fontSize: "17px", fontWeight: 600, color: "#0B111D", margin: "20px 0 8px 0" }}>Essential Cookies</h3>
      <Paragraph>Required for the website to function properly (e.g. navigation, security). These cannot be disabled.</Paragraph>

      <h3 style={{ fontFamily: "Inter, sans-serif", fontSize: "17px", fontWeight: 600, color: "#0B111D", margin: "20px 0 8px 0" }}>Analytics Cookies</h3>
      <Paragraph>Used to understand how visitors interact with the website (e.g. Google Analytics). These help us improve our content and services.</Paragraph>

      <h3 style={{ fontFamily: "Inter, sans-serif", fontSize: "17px", fontWeight: 600, color: "#0B111D", margin: "20px 0 8px 0" }}>Functional Cookies</h3>
      <Paragraph>Remember user preferences and settings to improve your experience on return visits.</Paragraph>

      <SectionHeading>3. Managing Cookies</SectionHeading>
      <Paragraph>You can:</Paragraph>
      <ul style={{ margin: "0 0 16px 0", paddingLeft: "24px", color: "#374151", lineHeight: "28px" }}>
        <li>Accept or reject cookies via the cookie banner on your first visit</li>
        <li>Change browser settings to block cookies at any time</li>
      </ul>
      <Paragraph>Please note that disabling cookies may affect website functionality.</Paragraph>

      <SectionHeading>4. Third-Party Cookies</SectionHeading>
      <Paragraph>
        We may use third-party services that set cookies, such as analytics or embedded content providers including the SmartLotto platform and social media embeds.
      </Paragraph>

      <SectionHeading>5. Consent</SectionHeading>
      <Paragraph>
        When you first visit the site, you will be asked to consent to non-essential cookies in accordance with EU regulations (ePrivacy Directive and GDPR).
      </Paragraph>

      <SectionHeading>6. Contact</SectionHeading>
      <Paragraph>
        For more information, contact: <a href="mailto:pro@castlebarceltic.ie" style={{ color: "#008236" }}>pro@castlebarceltic.ie</a>
      </Paragraph>
    </PolicyLayout>
  );
}
