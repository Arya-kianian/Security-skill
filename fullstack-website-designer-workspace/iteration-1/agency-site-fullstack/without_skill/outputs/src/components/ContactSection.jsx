'use client';

import { useEffect, useRef, useState } from 'react';

const SERVICES = [
  'Brand Identity',
  'Web Design & Development',
  'Motion & Animation',
  'Strategy & Consulting',
  'Campaign & Activation',
  'Other',
];

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="arrow-icon"
      aria-hidden="true"
    >
      <path
        d="M3 13L13 3M13 3H5M13 3V11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ContactSection() {
  const sectionRef = useRef(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  // Scroll-triggered reveal
  useEffect(() => {
    async function init() {
      const { default: gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        gsap.fromTo(
          '.contact-section__info',
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.contact-section',
              start: 'top 80%',
              once: true,
            },
          }
        );

        gsap.fromTo(
          '.contact-form',
          { opacity: 0, x: 40 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.contact-section',
              start: 'top 80%',
              once: true,
            },
          }
        );
      }, sectionRef.current);

      return () => ctx.revert();
    }
    init();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    // Basic validation
    if (!form.name || !form.email || !form.message) {
      setStatus('error');
      setErrorMsg('Please fill in your name, email, and message.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setStatus('error');
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    try {
      const res = await fetch('http://localhost:4000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Server error. Please try again.');
      }

      setStatus('success');
      setForm({
        name: '',
        email: '',
        company: '',
        service: '',
        budget: '',
        message: '',
      });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <section className="contact-section" id="contact" ref={sectionRef}>
      {/* Left: info */}
      <div className="contact-section__info">
        <p className="section-label" data-index="04" style={{ marginBottom: '1.5rem' }}>
          Get in Touch
        </p>
        <h2 className="contact-section__heading">
          Let's build
          <em>something</em>
          bold.
        </h2>

        <dl style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="contact-section__detail">
            <dt>Email</dt>
            <dd>
              <a href="mailto:hello@apexstudio.co">hello@apexstudio.co</a>
            </dd>
          </div>
          <div className="contact-section__detail">
            <dt>Phone</dt>
            <dd>
              <a href="tel:+15551234567">+1 (555) 123-4567</a>
            </dd>
          </div>
          <div className="contact-section__detail">
            <dt>Location</dt>
            <dd>New York, NY — Remote-first</dd>
          </div>
          <div className="contact-section__detail">
            <dt>Availability</dt>
            <dd style={{ color: '#22c55e' }}>Open to new projects</dd>
          </div>
        </dl>
      </div>

      {/* Right: form */}
      <form
        className="contact-form"
        onSubmit={handleSubmit}
        noValidate
        aria-label="Contact form"
      >
        <div className="form-group">
          <label htmlFor="name">Full Name *</label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="Jane Smith"
            autoComplete="name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address *</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="jane@company.com"
            autoComplete="email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="company">Company</label>
          <input
            id="company"
            name="company"
            type="text"
            value={form.company}
            onChange={handleChange}
            placeholder="Acme Corp"
            autoComplete="organization"
          />
        </div>

        <div className="form-group">
          <label htmlFor="service">Service Needed</label>
          <select
            id="service"
            name="service"
            value={form.service}
            onChange={handleChange}
          >
            <option value="">Select a service…</option>
            {SERVICES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="budget">Budget Range</label>
          <select
            id="budget"
            name="budget"
            value={form.budget}
            onChange={handleChange}
          >
            <option value="">Select a range…</option>
            <option value="<10k">Under $10,000</option>
            <option value="10-25k">$10,000 – $25,000</option>
            <option value="25-50k">$25,000 – $50,000</option>
            <option value="50-100k">$50,000 – $100,000</option>
            <option value="100k+">$100,000+</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="message">Tell us about your project *</label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={form.message}
            onChange={handleChange}
            placeholder="What are you building? What's the deadline? What keeps you up at night?"
            required
          />
        </div>

        <div className="form-submit">
          <button
            type="submit"
            className="btn-submit"
            disabled={status === 'loading'}
            aria-busy={status === 'loading'}
          >
            <span>{status === 'loading' ? 'Sending…' : 'Send Message'}</span>
            {status !== 'loading' && <ArrowIcon />}
          </button>

          {status === 'success' && (
            <p className="form-message form-message--success" role="status">
              Message received — we'll reply within 24 hours.
            </p>
          )}
          {status === 'error' && (
            <p className="form-message form-message--error" role="alert">
              {errorMsg}
            </p>
          )}
        </div>
      </form>
    </section>
  );
}
