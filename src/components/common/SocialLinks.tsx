import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

export interface SocialLinksProps {
  className?: string
  linkClassName?: string
  variant?: 'default' | 'footer'
}

const socialLinks = [
  {
    name: 'Twitter',
    url: siteConfig.social.twitter,
    label: 'Follow on Twitter'
  },
  {
    name: 'GitHub', 
    url: siteConfig.social.github,
    label: 'View GitHub profile'
  },
  {
    name: 'LinkedIn',
    url: siteConfig.social.linkedin, 
    label: 'Connect on LinkedIn'
  },
  {
    name: 'Topmate',
    url: siteConfig.social.topmate,
    label: 'Book a session on Topmate'
  }
]

export function SocialLinks({ 
  className,
  linkClassName,
  variant = 'default'
}: SocialLinksProps) {
  const baseStyles = variant === 'footer' 
    ? "prose-link" 
    : "text-muted-foreground hover:text-foreground transition-colors focus-ring"

  return (
    <div className={cn("flex items-center gap-4", className)}>
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(baseStyles, linkClassName)}
          aria-label={social.label}
        >
          {social.name}
        </a>
      ))}
    </div>
  )
}