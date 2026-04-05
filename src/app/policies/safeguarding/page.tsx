import { PolicyLayout, SectionHeading, Paragraph } from "@/components/PolicyLayout";

export const metadata = { title: "Safeguarding – Castlebar Celtic FC" };

export default function Safeguarding() {
  return (
    <PolicyLayout title="Safeguarding Statement" lastUpdated="January 2025">
      <Paragraph>
        Castlebar Celtic FC is fully committed to safeguarding the wellbeing of all children and young people who participate in our activities.
      </Paragraph>

      <SectionHeading>1. Our Commitment</SectionHeading>
      <Paragraph>
        We recognise that the welfare of the child is paramount. All children have the right to be protected, respected, and listened to.
      </Paragraph>

      <SectionHeading>2. Guiding Principles</SectionHeading>
      <ul style={{ margin: "0 0 16px 0", paddingLeft: "24px", color: "#374151", lineHeight: "28px" }}>
        <li>The safety and welfare of children is the first priority</li>
        <li>All children are treated equally and with dignity</li>
        <li>All volunteers and coaches have a duty of care</li>
      </ul>

      <SectionHeading>3. Roles and Responsibilities</SectionHeading>
      <Paragraph>
        The club has appointed the following safeguarding roles:
      </Paragraph>
      <ul style={{ margin: "0 0 16px 0", paddingLeft: "24px", color: "#374151", lineHeight: "28px" }}>
        <li>Children’s Officer</li>
        <li>Designated Liaison Person (DLP)</li>
      </ul>
      <Paragraph>
        These individuals are responsible for promoting good practice and handling concerns.
      </Paragraph>

      <SectionHeading>4. Code of Behaviour – Adults</SectionHeading>
      <Paragraph>All coaches, volunteers, and officials must:</Paragraph>
      <ul style={{ margin: "0 0 16px 0", paddingLeft: "24px", color: "#374151", lineHeight: "28px" }}>
        <li>Treat children with respect and fairness</li>
        <li>Avoid inappropriate physical contact</li>
        <li>Act as positive role models</li>
        <li>Never engage in behaviour that could be considered abusive</li>
      </ul>

      <SectionHeading>5. Code of Behaviour – Young Players</SectionHeading>
      <Paragraph>Players are expected to:</Paragraph>
      <ul style={{ margin: "0 0 16px 0", paddingLeft: "24px", color: "#374151", lineHeight: "28px" }}>
        <li>Show respect to teammates, coaches, and officials</li>
        <li>Play fairly and follow the rules</li>
        <li>Avoid bullying or inappropriate behaviour</li>
      </ul>

      <SectionHeading>6. Reporting Concerns</SectionHeading>
      <Paragraph>
        Any concerns regarding the welfare of a child should be reported to the Club’s Designated Liaison Person. Where necessary, concerns may be referred to Tusla or relevant authorities.
      </Paragraph>

      <SectionHeading>7. Online and Digital Safety</SectionHeading>
      <Paragraph>Castlebar Celtic FC is committed to protecting children online. We ensure:</Paragraph>
      <ul style={{ margin: "0 0 16px 0", paddingLeft: "24px", color: "#374151", lineHeight: "28px" }}>
        <li>Parental consent is obtained before publishing images</li>
        <li>No personal information of children is shared publicly</li>
        <li>Social media is used responsibly</li>
      </ul>

      <SectionHeading>8. Review</SectionHeading>
      <Paragraph>
        This safeguarding statement is reviewed regularly in line with best practice and national guidelines.
      </Paragraph>

      <SectionHeading>9. Contact</SectionHeading>
      <Paragraph>For safeguarding concerns, please contact our Children's Officer or DLP via <a href="mailto:pro@castlebarceltic.ie" style={{ color: "#008236" }}>pro@castlebarceltic.ie</a>.</Paragraph>
    </PolicyLayout>
  );
}
