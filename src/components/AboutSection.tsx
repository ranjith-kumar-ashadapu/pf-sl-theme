interface AboutSectionProps {
  content: string;
}

export default function AboutSection({ content }: AboutSectionProps) {
  return (
    <div className="card-container">
      <h2 className="section-title">ABOUT ME // HUNTER PROFILE</h2>
      <p className="section-content">{content}</p>
    </div>
  );
}
