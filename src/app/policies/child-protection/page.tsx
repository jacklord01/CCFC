import { PolicyLayout, SectionHeading, Paragraph } from "@/components/PolicyLayout";

export const metadata = { title: "Child Protection – Castlebar Celtic FC" };

export default function ChildProtection() {
  return (
    <PolicyLayout title="Child Protection Policy" lastUpdated="January 2025">
      <Paragraph>
        The safety and protection of children is central to everything we do at Castlebar Celtic FC. We adhere to the highest standards of child protection as mandated by the FAI and Irish legislation.
      </Paragraph>

      <SectionHeading>1. Our Policy</SectionHeading>
      <Paragraph>
        Our child protection policy is designed to ensure that all children can enjoy football in a safe, positive, and inclusive environment. 
      </Paragraph>

      <SectionHeading>2. Vetting and Training</SectionHeading>
      <ul style={{ margin: "0 0 16px 0", paddingLeft: "24px", color: "#374151", lineHeight: "28px" }}>
        <li>All coaches and volunteers undergo Garda Vetting</li>
        <li>Staff and volunteers complete FAI Safeguarding and Child Welfare Training</li>
        <li>Our welfare standards are reviewed annually</li>
      </ul>

      <SectionHeading>3. Safeguarding Statement</SectionHeading>
      <Paragraph>
        Our comprehensive <a href="/policies/safeguarding" style={{ color: "#008236" }}>Safeguarding Statement</a> provides full details on our commitments, guiding principles, and the specific roles (Children's Officer and DLP) tasked with overseeing child welfare at the club.
      </Paragraph>

      <SectionHeading>4. Reporting and Response</SectionHeading>
      <Paragraph>
        We have clear procedures for reporting any concerns regarding child welfare. All reports are handled with the utmost confidentiality and referred to the appropriate authorities (FAI, Tusla, An Garda Síochána) as required.
      </Paragraph>

      <SectionHeading>5. Contact</SectionHeading>
      <Paragraph>For any child protection related queries: <a href="mailto:pro@castlebarceltic.ie" style={{ color: "#008236" }}>pro@castlebarceltic.ie</a>.</Paragraph>
    </PolicyLayout>
  );
}
