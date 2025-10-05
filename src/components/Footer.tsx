import { Linkedin, Github, Mail } from 'lucide-react';

interface FooterProps {
  social: {
    linkedin: string;
    github: string;
    email: string;
  };
}

export default function Footer({ social }: FooterProps) {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="flex items-center gap-6">
          <a
            href={social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="LinkedIn"
          >
            <Linkedin size={24} />
          </a>
          <a
            href={social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="GitHub"
          >
            <Github size={24} />
          </a>
          <a
            href={`mailto:${social.email}`}
            className="social-link"
            aria-label="Email"
          >
            <Mail size={24} />
          </a>
        </div>

        <div className="footer-text">
          <p>SYSTEM INTERFACE v1.0 // PORTFOLIO</p>
          <p className="text-sm text-gray-500">Inspired by Solo Leveling</p>
        </div>
      </div>
    </footer>
  );
}
