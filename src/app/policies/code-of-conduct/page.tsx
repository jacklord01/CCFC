import { PolicyLayout, SectionHeading, Paragraph } from "@/components/PolicyLayout";

export const metadata = { title: "Code of Conduct – Castlebar Celtic FC" };

export default function CodeOfConduct() {
  return (
    <PolicyLayout title="Parent & Supporter Code of Conduct" lastUpdated="January 2025">
      <Paragraph>
        Castlebar Celtic FC is committed to providing a positive, safe, and enjoyable environment for all players. Parents and supporters play a vital role in supporting this.
      </Paragraph>

      <SectionHeading>1. Respect and Behaviour</SectionHeading>
      <Paragraph>All parents and supporters are expected to:</Paragraph>
      <ul style={{ margin: "0 0 16px 0", paddingLeft: "24px", color: "#374151", lineHeight: "28px" }}>
        <li>Encourage players and promote fair play</li>
        <li>Respect referees, coaches, and officials</li>
        <li>Avoid criticism, shouting, or abusive behaviour from the sidelines</li>
      </ul>

      <SectionHeading>2. Support for Players</SectionHeading>
      <ul style={{ margin: "0 0 16px 0", paddingLeft: "24px", color: "#374151", lineHeight: "28px" }}>
        <li>Focus on effort and enjoyment rather than results</li>
        <li>Never place undue pressure on children</li>
        <li>Recognise that development and participation are key</li>
      </ul>

      <SectionHeading>3. Communication</SectionHeading>
      <ul style={{ margin: "0 0 16px 0", paddingLeft: "24px", color: "#374151", lineHeight: "28px" }}>
        <li>Raise concerns respectfully through appropriate club channels</li>
        <li>Avoid confrontations with coaches, referees, or other parents</li>
      </ul>

      <SectionHeading>4. Safeguarding Awareness</SectionHeading>
      <Paragraph>Parents and supporters must:</Paragraph>
      <ul style={{ margin: "0 0 16px 0", paddingLeft: "24px", color: "#374151", lineHeight: "28px" }}>
        <li>Follow all club safeguarding guidelines</li>
        <li>Respect rules regarding photography and video recording</li>
        <li>Ensure children are collected safely and on time</li>
      </ul>

      <SectionHeading>5. Social Media</SectionHeading>
      <Paragraph>Parents and supporters must not:</Paragraph>
      <ul style={{ margin: "0 0 16px 0", paddingLeft: "24px", color: "#374151", lineHeight: "28px" }}>
        <li>Post negative or abusive comments about players, coaches, or officials</li>
        <li>Share images of children without appropriate consent</li>
        <li>Engage in online behaviour that could harm the club or its members</li>
      </ul>

      <SectionHeading>6. Breaches of Conduct</SectionHeading>
      <Paragraph>
        Failure to follow this Code of Conduct may result in action by the club, including restriction from attending events or activities.
      </Paragraph>

      <SectionHeading>7. Acknowledgement</SectionHeading>
      <Paragraph>
        Castlebar Celtic FC thanks all parents and supporters for helping to create a positive environment for our players.
      </Paragraph>
    </PolicyLayout>
  );
}
