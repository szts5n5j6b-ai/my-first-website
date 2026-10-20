import { useEffect, useRef, useState } from 'react';
import {
  Workflow,
  Brain,
  ShieldCheck,
  Zap,
  LineChart,
  Plug,
  Check,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

const NAV_LINKS = [
  { label: 'Benefits', href: '#benefits', cls: 'appear--scale', d: '0.16s' },
  { label: 'How It Works', href: '#how-it-works', cls: 'appear--soft', d: '0.28s' },
  { label: 'FAQs', href: '#faqs', cls: 'appear--scale', d: '0.40s' },
  { label: 'Pricing', href: '#pricing', cls: 'appear--soft', d: '0.52s' },
] as const;

const BENEFITS = [
  {
    icon: Workflow,
    title: 'Adaptive workflows',
    body: 'Agents learn your existing processes and adapt as your operations evolve — no retraining from scratch.',
  },
  {
    icon: Brain,
    title: 'Context-aware execution',
    body: 'Each agent carries the context it needs to make judgment calls, not just follow rigid scripts.',
  },
  {
    icon: ShieldCheck,
    title: 'Built-in guardrails',
    body: 'Approval loops, scope limits, and audit logs keep every action reviewable and reversible.',
  },
  {
    icon: Zap,
    title: 'Deploys in minutes',
    body: 'Connect a tool, describe the task, and ship a working agent before your next standup.',
  },
  {
    icon: LineChart,
    title: 'Observable by default',
    body: 'Every run is traced, measured, and exportable so you can prove the work got done right.',
  },
  {
    icon: Plug,
    title: 'Plugs into your stack',
    body: 'Native integrations with the tools your team already lives in — Slack, Jira, Stripe, and more.',
  },
];

const STEPS = [
  {
    n: '01',
    title: 'Connect your tools',
    body: 'Authorize the systems your agents should touch. Vesper maps permissions and scopes automatically so nothing gets over-permissioned.',
  },
  {
    n: '02',
    title: 'Describe the workflow',
    body: 'Write the task in plain language or hand over an existing playbook. Vesper turns it into a structured, reviewable agent workflow.',
  },
  {
    n: '03',
    title: 'Train and refine',
    body: 'Run the agent in a sandbox, correct its judgment calls, and promote it to production once it matches how your team actually operates.',
  },
  {
    n: '04',
    title: 'Scale across operations',
    body: 'Deploy the same agent across teams and regions. Vesper handles versioning, rollbacks, and audit trails as you grow.',
  },
];

const FAQS = [
  {
    q: 'How long does it take to deploy my first agent?',
    a: 'Most teams ship a working agent within an afternoon. Connect a tool, describe the workflow in plain language, run it in the sandbox, and promote to production once you are happy with the output.',
  },
  {
    q: 'What tools does Vesper integrate with?',
    a: 'Vesper ships native integrations for Slack, Jira, Stripe, HubSpot, Notion, GitHub, and Google Workspace. For anything else, you can use our REST and webhook APIs to wire up a custom connection in minutes.',
  },
  {
    q: 'Can I review what an agent does before it acts?',
    a: 'Yes. Approval workflows let you require sign-off on any action before it runs. You can scope approvals to specific tools, thresholds, or teams, and adjust them as trust grows.',
  },
  {
    q: 'Is my data used to train shared models?',
    a: 'No. Your workflows, data, and corrections stay inside your workspace. Nothing is shared across customers or used to train foundation models without explicit opt-in.',
  },
  {
    q: 'What happens if an agent makes a mistake?',
    a: 'Every action is logged and reversible within your configured retention window. You can roll back a run, retrain the agent on the corrected outcome, and add guardrails so that decision path is not repeated.',
  },
  {
    q: 'Do you offer onboarding support?',
    a: 'Yes. The Growth and Scale plans include guided onboarding, and Scale adds a dedicated solutions architect for multi-team rollouts.',
  },
];

const PRICING = [
  {
    name: 'Starter',
    blurb: 'For small teams testing their first agents.',
    price: '$0',
    per: '/month',
    features: ['Up to 3 agents', '1,000 runs / month', '5 integrations', 'Sandbox + audit log', 'Community support'],
    cta: 'Start for Free',
    featured: false,
  },
  {
    name: 'Growth',
    blurb: 'For teams running agents in production.',
    price: '$49',
    per: '/seat / month',
    features: ['Unlimited agents', '25,000 runs / month', 'All integrations', 'Approval workflows', 'Guided onboarding', 'Priority support'],
    cta: 'Start for Free',
    featured: true,
    badge: 'Most popular',
  },
  {
    name: 'Scale',
    blurb: 'For organizations rolling out across teams.',
    price: 'Custom',
    per: '',
    features: ['Volume run pricing', 'SSO + SCIM', 'Dedicated environment', 'Solutions architect', 'Custom SLAs', '24/7 support'],
    cta: 'Talk to Sales',
    featured: false,
  },
];

function LogoMark() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <g transform="rotate(-30 12 12)">
        <circle cx="7.3" cy="3.2" r="1.45" />
        <rect x="5.5" y="4.7" width="3.6" height="14.6" rx="1.8" />
        <rect x="14.9" y="4.7" width="3.6" height="14.6" rx="1.8" />
        <circle cx="16.7" cy="20.8" r="1.45" />
      </g>
    </svg>
  );
}

function Sparkle() {
  return (
    <svg className="badge-star" width="18" height="20" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
      <path d="M12 2.6C12.55 2.6 12.88 3.15 13.08 4.7c.62 4.7 1.52 5.6 6.22 6.22 1.55.2 2.1.53 2.1 1.08s-.55.88-2.1 1.08c-4.7.62-5.6 1.52-6.22 6.22-.2 1.55-.53 2.1-1.08 2.1s-.88-.55-1.08-2.1c-.62-4.7-1.52-5.6-6.22-6.22C3.15 12.88 2.6 12.55 2.6 12s.55-.88 2.1-1.08c4.7-.62 5.6-1.52 6.22-6.22C11.12 3.15 11.45 2.6 12 2.6Z" />
    </svg>
  );
}

function StatWorkflowIcon() {
  return (
    <svg className="stat-icon" viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <linearGradient id="lg-l" x1="3" y1="2" x2="14" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.38" />
          <stop offset="1" stopColor="#3a3a3a" stopOpacity="0.62" />
        </linearGradient>
        <linearGradient id="lg-r" x1="3" y1="2" x2="14" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#3a3a3a" stopOpacity="0.38" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.62" />
        </linearGradient>
      </defs>
      <rect x="3.4" y="2.6" width="7.2" height="18.8" rx="3.6" fill="url(#lg-l)" />
      <rect x="13.4" y="2.6" width="7.2" height="18.8" rx="3.6" fill="url(#lg-r)" />
      <rect x="9.2" y="10.9" width="5.6" height="2.2" rx="1.1" fill="#4a4a4a" />
    </svg>
  );
}

function StatDownloadIcon() {
  return (
    <svg className="stat-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2.4" y="2.4" width="19.2" height="19.2" rx="6.2" fill="#ffffff" />
      <path d="M12 7v8M12 15l-3.2-3.2M12 15l3.2-3.2" stroke="#111" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StatAvatarsIcon() {
  return (
    <svg className="stat-icon-wide" viewBox="0 0 40 22" aria-hidden="true">
      <circle cx="10.2" cy="11" r="9.2" fill="#2b2b2b" />
      <ellipse cx="10.2" cy="12.1" rx="4.15" ry="3.7" fill="#f4f4f4" />
      <polygon points="6.4,9 7.4,11.5 5.6,11.2" fill="#f4f4f4" />
      <polygon points="14,9 13,11.5 14.8,11.2" fill="#f4f4f4" />
      <circle cx="8.9" cy="12" r="0.7" fill="#1a1a1a" />
      <circle cx="11.5" cy="12" r="0.7" fill="#1a1a1a" />
      <circle cx="20.2" cy="11" r="9.2" fill="#ffffff" />
      <circle cx="18.5" cy="10.5" r="1.7" fill="#111" />
      <circle cx="21.9" cy="10.5" r="1.7" fill="#111" />
      <ellipse cx="20.2" cy="12.6" rx="1.1" ry="0.8" fill="#111" />
      <path d="M18 14.4c1 1 3.4 1 4.4 0" stroke="#111" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <circle cx="30.2" cy="11" r="9.2" fill="#f26b1d" />
      <text x="30.2" y="15.1" fontSize="12.5" fontFamily="Inter, sans-serif" fontWeight="700" fill="#ffffff" textAnchor="middle">e</text>
    </svg>
  );
}

function App() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [submitted, setSubmitted] = useState(false);

  // Entrance animation: mark .is-in on animationend; force fallback after 2 rAFs.
  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;

    const appears = Array.from(root.querySelectorAll<HTMLElement>('.appear'));
    const heroPhoto = root.querySelector<HTMLElement>('.hero-photo');

    const markIn = (el: Element) => el.classList.add('is-in');

    appears.forEach((el) => {
      el.addEventListener('animationend', () => markIn(el), { once: true });
    });
    if (heroPhoto) {
      heroPhoto.addEventListener('animationend', () => markIn(heroPhoto), { once: true });
    }

    let cancelled = false;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (cancelled) return;
        const checkAndForce = (el: Element | null) => {
          if (!el) return;
          const anims = (el as HTMLElement).getAnimations
            ? (el as HTMLElement).getAnimations()
            : [];
          const running = anims.some((a) => a.playState === 'running');
          if (!running) markIn(el);
        };
        appears.forEach(checkAndForce);
        checkAndForce(heroPhoto);
      });
    });

    return () => {
      cancelled = true;
    };
  }, []);

  // Scroll reveal for .reveal elements.
  useEffect(() => {
    const reveals = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    if (reveals.length === 0) return;

    if (typeof IntersectionObserver === 'undefined') {
      reveals.forEach((el) => el.classList.add('is-in'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );

    reveals.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Burger menu: toggle, Escape, nav-click, and resize≥901 close it.
  useEffect(() => {
    const burger = document.querySelector<HTMLButtonElement>('.burger');
    const setMenu = (open: boolean) => {
      document.body.classList.toggle('menu-open', open);
      if (burger) {
        burger.setAttribute('aria-expanded', String(open));
        burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      }
    };

    const onBurger = () => setMenu(!document.body.classList.contains('menu-open'));
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenu(false);
    };
    const onNavClick = () => setMenu(false);
    const onResize = () => {
      if (window.matchMedia('(min-width: 901px)').matches) setMenu(false);
    };

    burger?.addEventListener('click', onBurger);
    document.addEventListener('keydown', onKey);
    document.querySelectorAll<HTMLAnchorElement>('.mobile-nav .nav-link').forEach((l) =>
      l.addEventListener('click', onNavClick),
    );
    window.addEventListener('resize', onResize);

    return () => {
      burger?.removeEventListener('click', onBurger);
      document.removeEventListener('keydown', onKey);
      document
        .querySelectorAll<HTMLAnchorElement>('.mobile-nav .nav-link')
        .forEach((l) => l.removeEventListener('click', onNavClick));
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const toggleFaq = (i: number) => setOpenFaq((cur) => (cur === i ? null : i));

  const onStartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('start');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const onDemoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('how-it-works');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const onContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <div className="grain" />

      <div className="page" ref={pageRef}>
        <header className="header">
          <a href="#top" className="logo appear appear--scale" style={{ ['--d' as string]: '0.08s' }} aria-label="Vesper ai">
            <LogoMark />
            Vesper<span className="logo-suffix">.ai</span>
          </a>

          <nav id="site-nav" aria-label="Primary">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`nav-link appear ${l.cls}`}
                style={{ ['--d' as string]: l.d }}
              >
                <span>{l.label}</span>
              </a>
            ))}
          </nav>

          <a
            href="#start"
            onClick={onStartClick}
            className="btn btn-solid header-cta appear appear--scale"
            style={{ ['--d' as string]: '0.345s' }}
          >
            <span>Start for Free</span>
          </a>

          <button
            className="burger appear appear--scale"
            style={{ ['--d' as string]: '0.345s' }}
            aria-controls="site-nav"
            aria-expanded="false"
            aria-label="Open menu"
          >
            <span />
            <span />
            <span />
          </button>
        </header>

        <main className="hero" id="top">
          <div className="hero-photo" />

          <div className="hero-inner">
            <div className="badge appear appear--pop" style={{ ['--d' as string]: '0.22s' }}>
              <Sparkle />
              <span>Operational AI Infrastructure</span>
            </div>

            <h1 className="hero-h1">
              <span className="headline-line">
                <span className="appear appear--mask" style={{ ['--d' as string]: '0.42s', display: 'inline-block' }}>
                  Train <em>AI agents</em> on your
                </span>
              </span>
              <span className="headline-line">
                <span className="appear appear--mask" style={{ ['--d' as string]: '0.62s', display: 'inline-block' }}>
                  workflows in minutes.
                </span>
              </span>
            </h1>

            <p className="lede appear appear--soft" style={{ ['--d' as string]: '0.82s', animationDuration: '1.25s' }}>
              Deploy adaptive AI agents that learn, execute, and scale operational tasks across your business.
            </p>

            <div className="hero-actions">
              <a
                href="#start"
                onClick={onStartClick}
                className="btn btn-solid hero-solid appear appear--btn"
                style={{ ['--d' as string]: '0.96s' }}
              >
                <span>Start for Free</span>
              </a>
              <a
                href="#demo"
                onClick={onDemoClick}
                className="btn btn-ghost hero-ghost appear appear--side"
                style={{ ['--d' as string]: '1.10s' }}
              >
                <span>See it in action</span>
              </a>
            </div>
          </div>
        </main>

        <footer className="stats">
          <div className="stat appear appear--stat" style={{ ['--d' as string]: '1.12s' }}>
            <StatWorkflowIcon />
            <span>4.2M+ workflows automated</span>
          </div>
          <div className="stat appear appear--stat" style={{ ['--d' as string]: '1.28s' }}>
            <StatDownloadIcon />
            <span>92% reduction in manual operations</span>
          </div>
          <div className="stat appear appear--stat" style={{ ['--d' as string]: '1.44s' }}>
            <StatAvatarsIcon />
            <span>180+ operational teams onboarded</span>
          </div>
        </footer>

        {/* Benefits */}
        <section className="section" id="benefits">
          <span className="section-eyebrow reveal">Benefits</span>
          <h2 className="section-title reveal">
            Everything your ops team <em>keeps doing manually</em>
          </h2>
          <p className="section-lede reveal">
            Vesper turns repeatable operational work into agents that handle it end-to-end — with the judgment and guardrails your team already trusts.
          </p>
          <div className="benefits-grid">
            {BENEFITS.map((b) => {
              const Icon = b.icon;
              return (
                <div className="benefit-card reveal" key={b.title}>
                  <div className="benefit-icon">
                    <Icon size={20} strokeWidth={1.75} />
                  </div>
                  <h3>{b.title}</h3>
                  <p>{b.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* How it works */}
        <section className="section" id="how-it-works">
          <span className="section-eyebrow reveal">How It Works</span>
          <h2 className="section-title reveal">
            From idea to <em>production agent</em> in four steps
          </h2>
          <p className="section-lede reveal">
            No prompt archaeology, no fragile pipelines. Vesper turns plain-language workflows into reviewable agents you can actually trust in production.
          </p>
          <div className="steps">
            {STEPS.map((s) => (
              <div className="step reveal" key={s.n}>
                <div className="step-num">{s.n}</div>
                <div className="step-body">
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section className="section" id="faqs">
          <span className="section-eyebrow reveal">FAQs</span>
          <h2 className="section-title reveal">
            Questions, <em>answered</em>
          </h2>
          <p className="section-lede reveal">
            Everything you need to know before deploying your first agent. Still curious? Reach out any time.
          </p>
          <div className="faq-list">
            {FAQS.map((f, i) => (
              <div className={`faq-item reveal ${openFaq === i ? 'is-open' : ''}`} key={f.q}>
                <button
                  type="button"
                  className="faq-q"
                  aria-expanded={openFaq === i}
                  onClick={() => toggleFaq(i)}
                >
                  <span>{f.q}</span>
                  <ChevronDown className="faq-chevron" size={18} strokeWidth={1.75} />
                </button>
                <div
                  className="faq-a"
                  ref={(el) => {
                    if (el) {
                      el.style.maxHeight = openFaq === i ? `${el.scrollHeight}px` : '0px';
                    }
                  }}
                >
                  <div className="faq-a-inner">{f.a}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="section" id="pricing">
          <span className="section-eyebrow reveal">Pricing</span>
          <h2 className="section-title reveal">
            Plans that scale with <em>your operations</em>
          </h2>
          <p className="section-lede reveal">
            Start free. Upgrade when your agents are doing real work. Every plan includes the audit log, guardrails, and observability.
          </p>
          <div className="pricing-grid">
            {PRICING.map((p) => (
              <div className={`price-card reveal ${p.featured ? 'featured' : ''}`} key={p.name}>
                {p.badge && <div className="price-badge">{p.badge}</div>}
                <div className="price-name">{p.name}</div>
                <div className="price-blurb">{p.blurb}</div>
                <div className="price-amount">
                  <span className="num">{p.price}</span>
                  <span className="per">{p.per}</span>
                </div>
                <ul className="price-features">
                  {p.features.map((feat) => (
                    <li key={feat}>
                      <Check size={16} strokeWidth={2} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#start"
                  onClick={onStartClick}
                  className={`btn ${p.featured ? 'btn-solid' : 'btn-ghost'}`}
                >
                  <span>{p.cta}</span>
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* CTA / start */}
        <section className="cta" id="start">
          <div className="badge reveal" style={{ marginBottom: 24 }}>
            <Sparkles size={16} strokeWidth={1.75} />
            <span>Start in minutes</span>
          </div>
          <h2 className="cta-title reveal">
            Ship your first <em>operational agent</em> today
          </h2>
          <p className="cta-lede reveal">
            Free to start. No credit card required. Connect a tool, describe the workflow, and watch your agent take over the repetitive work.
          </p>
          {submitted ? (
            <div
              className="reveal is-in"
              style={{
                marginTop: 28,
                padding: '18px 24px',
                borderRadius: 10,
                border: '1px solid rgba(220,230,255,0.45)',
                background: 'linear-gradient(135deg, rgba(186,208,255,0.1), rgba(0,0,0,0.3))',
                color: '#fff',
                fontSize: 15,
                letterSpacing: '-0.01em',
              }}
            >
              Thanks — we received your request. Check your inbox for a link to activate your workspace.
            </div>
          ) : (
            <form className="cta-actions reveal" onSubmit={onContactSubmit}>
              <input
                type="email"
                required
                placeholder="you@company.com"
                aria-label="Work email"
                style={{
                  height: 'var(--btn-h)',
                  padding: '0 16px',
                  borderRadius: 6,
                  border: '1px solid var(--border)',
                  background: 'rgba(8,8,8,0.55)',
                  color: '#fff',
                  fontSize: 'var(--btn)',
                  fontFamily: 'inherit',
                  letterSpacing: '-0.01em',
                  minWidth: 260,
                  flex: 1,
                  maxWidth: 360,
                }}
              />
              <button type="submit" className="btn btn-solid hero-solid">
                <span>Start for Free</span>
              </button>
            </form>
          )}
        </section>

        {/* Footer */}
        <footer className="site-footer">
          <a href="#top" className="logo" aria-label="Vesper ai">
            <LogoMark />
            Vesper<span className="logo-suffix">.ai</span>
          </a>
          <span className="footer-copy">© {new Date().getFullYear()} Vesper AI, Inc. All rights reserved.</span>
          <nav aria-label="Footer" style={{ display: 'flex', gap: 18 }}>
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                style={{ fontSize: 13, color: 'var(--muted)', letterSpacing: '-0.01em' }}
              >
                {l.label}
              </a>
            ))}
          </nav>
        </footer>
      </div>

      <div className="menu-backdrop" />
      <nav className="mobile-nav" aria-label="Mobile">
        {NAV_LINKS.map((l) => (
          <a key={l.href} href={l.href} className="nav-link">
            <span>{l.label}</span>
          </a>
        ))}
        <a href="#start" className="btn btn-solid" style={{ width: '100%', marginTop: 8 }}>
          <span>Start for Free</span>
        </a>
      </nav>
    </>
  );
}

export default App;
