export default function GlitchTitle({ as: Tag = "h1", text, className = "" }) {
  return (
    <Tag data-text={text} className={`glitch-text ${className}`}>
      {text}
    </Tag>
  );
}
