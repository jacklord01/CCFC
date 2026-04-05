import { PolicyLayout, SectionHeading, Paragraph } from "@/components/PolicyLayout";

export const metadata = { title: "Lotto & Fundraising Terms – Castlebar Celtic FC" };

export default function LottoTerms() {
  return (
    <PolicyLayout title="Lotto & Fundraising Terms" lastUpdated="January 2025">
      <Paragraph>
        Castlebar Celtic FC organises fundraising activities, including lotto draws through SmartLotto and other events, to support club development. 
        Participation in these activities constitutes acceptance of these terms.
      </Paragraph>

      <SectionHeading>1. Eligibility</SectionHeading>
      <ul style={{ margin: "0 0 16px 0", paddingLeft: "24px", color: "#374151", lineHeight: "28px" }}>
        <li>Participants must be at least 18 years of age</li>
        <li>Participants must comply with all applicable Irish gambling laws</li>
      </ul>

      <SectionHeading>2. Entry and Payment</SectionHeading>
      <ul style={{ margin: "0 0 16px 0", paddingLeft: "24px", color: "#374151", lineHeight: "28px" }}>
        <li>Entries should be submitted through approved channels (e.g. SmartLotto)</li>
        <li>All payments must be completed before entry is considered valid</li>
        <li>The club reserves the right to refuse or cancel entries</li>
      </ul>

      <SectionHeading>3. Draw Process and Prizes</SectionHeading>
      <Paragraph>
        Draws will be conducted in a fair and transparent manner, with results published via official club channels. 
        Prizes will be as advertised, and winners will be notified using the provided contact details. 
        The club reserves the right to substitute prizes where necessary.
      </Paragraph>

      <SectionHeading>4. Use of Funds</SectionHeading>
      <Paragraph>
        Funds raised through these activities will be used specifically to support club activities, maintenance of facilities like Celtic Park, and general club development.
      </Paragraph>

      <SectionHeading>5. Liability and Refunds</SectionHeading>
      <Paragraph>
        Castlebar Celtic FC is not responsible for lost, delayed, or incomplete entries, or technical issues affecting participation. Entries are non-refundable except in cases where the event is cancelled.
      </Paragraph>

      <SectionHeading>6. Changes</SectionHeading>
      <Paragraph>
        The club reserves the right to amend these terms at any time.
      </Paragraph>

      <SectionHeading>7. Contact</SectionHeading>
      <Paragraph>For any Fundraising queries: <a href="mailto:pro@castlebarceltic.ie" style={{ color: "#008236" }}>pro@castlebarceltic.ie</a>.</Paragraph>
    </PolicyLayout>
  );
}
