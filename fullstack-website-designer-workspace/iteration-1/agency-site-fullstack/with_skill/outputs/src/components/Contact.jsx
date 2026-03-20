'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BUDGET_OPTIONS = [
  'Under $10k',
  '$10k – $25k',
  '$25k – $75k',
  '$75k – $150k',
  '$150k+',
];

const SERVICE_OPTIONS = [
  'Brand Identity',
  'Web Design & Dev',
  'Motion & 3D',
  'Strategy',
  'Campaign',
];

const INITIAL_FORM = {
  name:    '',
  email:   '',
  company: '',
  budget:  '',
  service: '',
  message: '',
};

export default function Contact() {
  const sectionRef = useRef(null);
  const formRef    = useRef(null);
  const headerRef  = useRef(null);

  const [form,    setForm]    = useState(INITIAL_FORM);
  const [errors,  setErrors]  = useState({});
  const [status,  setStatus]  = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errMsg,  setErrMsg]  = useState('');

  /* ─── GSAP entrance ─────────────────────────────────────────── */
  useEffect(() => {
    gsap.from(headerRef.current, {
      y: 50, opacity: 0, duration: 0.9, ease: 'expo.out',
      scrollTrigger: { trigger: headerRef.current, start: 'top 85%', toggleActions: 'play none none none' },
    });

    if (formRef.current) {
      gsap.from(Array.from(formRef.current.querySelectorAll('.form-group')), {
        y: 40, opacity: 0, duration: 0.75, stagger: 0.08, ease: 'expo.out',
        scrollTrigger: { trigger: formRef.current, start: 'top 82%', toggleActions: 'play none none none' },
      });
    }
  }, []);

  /* ─── Validation ─────────────────────────────────────────────── */
  function validate(data) {
    const e = {};
    if (!data.name.trim())                    e.name    = 'Name is required.';
    if (!data.email.trim())                   e.email   = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(data.email)) e.email = 'Enter a valid email address.';
    if (!data.message.trim())                 e.message = 'Tell us about your project.';
    if (data.message.trim().length < 20)      e.message = 'Please give us a bit more detail (20+ characters).';
    return e;
  }

  /* ─── Submit ─────────────────────────────────────────────────── */
  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      // Shake the form
      gsap.fromTo(formRef.current,
        { x: -8 }, { x: 0, duration: 0.4, ease: 'elastic.out(1,0.3)' }
      );
      return;
    }
    setErrors({});
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Submission failed.');

      setStatus('success');
      setForm(INITIAL_FORM);

      // Celebrate animation
      gsap.fromTo(
        formRef.current,
        { scale: 0.97, opacity: 0.6 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'expo.out' }
      );
    } catch (err) {
      setStatus('error');
      setErrMsg(err.message || 'Something went wrong. Please try again.');
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    if (status === 'error') setStatus('idle');
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        background:  '#000',
        borderTop:   '3px solid #ffffff',
        padding:     'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 4rem)',
      }}
      aria-labelledby="contact-title"
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 480px), 1fr))',
          gap:    'clamp(3rem, 6vw, 6rem)',
          alignItems: 'start',
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        {/* Left column */}
        <div ref={headerRef}>
          <span className="section-label">Get In Touch</span>
          <h2
            id="contact-title"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-2xl)',
              fontWeight: 900,
              textTransform: 'uppercase',
              lineHeight: 1.0,
              color: '#fff',
              marginBottom: '1.5rem',
            }}
          >
            Let's Build<br />
            Something<br />
            <span style={{ color: '#ef4444' }}>Unforgettable</span>
          </h2>

          <p
            style={{
              color:      'rgba(255,255,255,0.55)',
              fontSize:   'var(--text-sm)',
              lineHeight: 1.7,
              marginBottom: '3rem',
              maxWidth: '400px',
            }}
          >
            Tell us about your project. The more detail the better — we read
            every message and respond within one business day.
          </p>

          {/* Contact details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[
              { label: 'New business', value: 'hello@apexstudio.com' },
              { label: 'Press & media', value: 'press@apexstudio.com' },
              { label: 'Based in', value: 'New York — Remote worldwide' },
            ].map(({ label, value }) => (
              <div key={label}>
                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize:   '0.65rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.35)',
                    marginBottom: '0.25rem',
                  }}
                >
                  {label}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize:   'var(--text-sm)',
                    color: '#fff',
                    fontWeight: 500,
                  }}
                >
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* Social links */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
            {['Twitter', 'Instagram', 'LinkedIn', 'Dribbble'].map((s) => (
              <a
                key={s}
                href="#"
                aria-label={`Apex Studio on ${s}`}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.5)',
                  border: '1.5px solid #333',
                  padding: '0.4rem 0.8rem',
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#ef4444'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#333'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        {/* Right column — Form */}
        <div>
          {status === 'success' ? (
            <SuccessBanner onReset={() => setStatus('idle')} />
          ) : (
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              noValidate
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                border: '3px solid #333',
                padding: 'clamp(1.75rem, 4vw, 3rem)',
                background: '#0a0a0a',
              }}
              aria-label="Contact form"
            >
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-lg)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: '#fff',
                  letterSpacing: '-0.01em',
                  marginBottom: '0.5rem',
                }}
              >
                Start a Conversation
              </h3>

              {/* Row: Name + Email */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <FormField
                  id="name" name="name" label="Full Name *"
                  placeholder="Sofia Reyes" value={form.name}
                  onChange={handleChange} error={errors.name}
                />
                <FormField
                  id="email" name="email" label="Email *" type="email"
                  placeholder="sofia@brand.com" value={form.email}
                  onChange={handleChange} error={errors.email}
                />
              </div>

              {/* Company */}
              <FormField
                id="company" name="company" label="Company"
                placeholder="Voltex EV" value={form.company}
                onChange={handleChange}
              />

              {/* Row: Service + Budget */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label htmlFor="service" className="form-label">Service</label>
                  <select
                    id="service" name="service"
                    value={form.service}
                    onChange={handleChange}
                    className="form-input"
                    style={{ cursor: 'pointer', appearance: 'none' }}
                  >
                    <option value="">Select…</option>
                    {SERVICE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="budget" className="form-label">Budget</label>
                  <select
                    id="budget" name="budget"
                    value={form.budget}
                    onChange={handleChange}
                    className="form-input"
                    style={{ cursor: 'pointer', appearance: 'none' }}
                  >
                    <option value="">Select…</option>
                    {BUDGET_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  Project Brief *
                </label>
                <textarea
                  id="message" name="message" rows={5}
                  placeholder="Tell us what you're building, the problem you're solving, and any key deadlines…"
                  value={form.message}
                  onChange={handleChange}
                  className={`form-textarea${errors.message ? ' error' : ''}`}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && (
                  <span id="message-error" className="form-error" role="alert">
                    {errors.message}
                  </span>
                )}
              </div>

              {/* Global error */}
              {status === 'error' && (
                <div
                  role="alert"
                  style={{
                    border: '2px solid #ef4444',
                    padding: '0.75rem 1rem',
                    color: '#ef4444',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                  }}
                >
                  {errMsg}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  fontSize: 'var(--text-xs)',
                  opacity: status === 'loading' ? 0.7 : 1,
                  cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                }}
                aria-busy={status === 'loading'}
              >
                {status === 'loading' ? (
                  <>
                    <span style={{ display: 'inline-block', animation: 'spin 0.8s linear infinite' }}>◌</span>
                    Sending…
                    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                  </>
                ) : (
                  'Send Message →'
                )}
              </button>

              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.62rem',
                  color: 'rgba(255,255,255,0.3)',
                  letterSpacing: '0.08em',
                  textAlign: 'center',
                }}
              >
                We respond within 1 business day. No spam, ever.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* ── Reusable field ──────────────────────────────────────────────── */
function FormField({ id, name, label, type = 'text', placeholder, value, onChange, error }) {
  return (
    <div className="form-group">
      <label htmlFor={id} className="form-label">{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={type === 'email' ? 'email' : 'off'}
        className={`form-input${error ? ' error' : ''}`}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={!!error}
      />
      {error && (
        <span id={`${id}-error`} className="form-error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

/* ── Success banner ──────────────────────────────────────────────── */
function SuccessBanner({ onReset }) {
  const ref = useRef(null);
  useEffect(() => {
    gsap.from(ref.current, { scale: 0.92, opacity: 0, duration: 0.6, ease: 'expo.out' });
  }, []);

  return (
    <div
      ref={ref}
      style={{
        border: '3px solid #ef4444',
        padding: 'clamp(2rem, 5vw, 3.5rem)',
        background: '#0a0a0a',
        textAlign: 'center',
      }}
      role="status"
      aria-live="polite"
    >
      <div
        aria-hidden="true"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(3rem, 8vw, 5rem)',
          color: '#ef4444',
          lineHeight: 1,
          marginBottom: '1rem',
        }}
      >
        ✓
      </div>
      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-xl)',
          fontWeight: 900,
          textTransform: 'uppercase',
          color: '#fff',
          marginBottom: '1rem',
        }}
      >
        Message Sent
      </h3>
      <p
        style={{
          color: 'rgba(255,255,255,0.6)',
          fontSize: 'var(--text-sm)',
          lineHeight: 1.65,
          marginBottom: '2rem',
          maxWidth: '380px',
          marginInline: 'auto',
        }}
      >
        We've received your brief and will be in touch within one business day.
        Expect something worth reading.
      </p>
      <button
        onClick={onReset}
        className="btn btn-outline"
        style={{ fontSize: 'var(--text-xs)' }}
      >
        Send Another
      </button>
    </div>
  );
}
