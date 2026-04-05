import { PolicyLayout, SectionHeading, Paragraph } from "@/components/PolicyLayout";

export const metadata = { title: "Photo & Media Policy – Castlebar Celtic FC" };

export default function MediaPolicy() {
  return (
    <PolicyLayout title="Photography & Media Consent Policy" lastUpdated="January 2025">
      <Paragraph>
        Castlebar Celtic FC recognises the importance of celebrating achievements and promoting the club through photography and video, while ensuring the safety and privacy of all members, especially children.
      </Paragraph>

      <SectionHeading>1. Purpose of Media Use</SectionHeading>
      <Paragraph>Images and videos may be used for:</Paragraph>
      <ul style={{ margin: "0 0 16px 0", paddingLeft: "24px", color: "#374151", lineHeight: "28px" }}>
        <li>Club website and official social media channels</li>
        <li>Match reports and news articles</li>
        <li>Promotional materials for the club</li>
      </ul>

      <SectionHeading>2. Consent Requirements</SectionHeading>
      <ul style={{ margin: "0 0 16px 0", paddingLeft: "24px", color: "#374151", lineHeight: "28px" }}>
        <li>Written consent will be obtained from parents/guardians before publishing images of children</li>
        <li>Adult members may provide consent for their own images</li>
      </ul>

      <SectionHeading>3. Safe Use of Images</SectionHeading>
      <Paragraph>The club will:</Paragraph>
      <ul style={{ margin: "0 0 16px 0", paddingLeft: "24px", color: "#374151", lineHeight: "28px" }}>
        <li>Avoid naming children in images where possible</li>
        <li>Never publish personal details alongside images</li>
        <li>Ensure images are appropriate and respectful</li>
      </ul>

      <SectionHeading>4. Photography at Events</SectionHeading>
      <Paragraph>Parents and spectators:</Paragraph>
      <ul style={{ margin: "0 0 16px 0", paddingLeft: "24px", color: "#374151", lineHeight: "28px" }}>
        <li>May take photos for personal use only</li>
        <li>Must not publish images of other children without consent</li>
        <li>Must follow any restrictions set by the club at specific tournaments or events</li>
      </ul>

      <SectionHeading>5. Social Media Monitoring</SectionHeading>
      <Paragraph>
        The club will use official channels for posting content, monitor for inappropriate comments, and ensure compliance with safeguarding guidelines. 
      </Paragraph>

      <SectionHeading>6. Withdrawal of Consent</SectionHeading>
      <Paragraph>
        Consent may be withdrawn at any time by contacting us: <a href="mailto:pro@castlebarceltic.ie" style={{ color: "#008236" }}>pro@castlebarceltic.ie</a>. The club will take reasonable steps to remove images from digital platforms.
      </Paragraph>

      <SectionHeading>7. Breaches</SectionHeading>
      <Paragraph>
        Any misuse of images or breach of this policy may result in action by the club.
      </Paragraph>
    </PolicyLayout>
  );
}
