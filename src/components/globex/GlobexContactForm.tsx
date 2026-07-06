'use client';

import { useState } from 'react';
import { appendFormExtras, buildContactFormPayload, splitFullName, submitContactForm } from '@/lib/contactForm';

type GlobexContactFormProps = {
  variant: 'contact' | 'appointment';
  formId?: string;
  submitLabel?: string;
  /** Prepended to message body (e.g. service name on detail pages). */
  inquiryContext?: string;
};

type SubmitStatus = 'idle' | 'success' | 'error';

export default function GlobexContactForm({
  variant,
  formId = 'contact-form',
  submitLabel,
  inquiryContext,
}: GlobexContactFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [department, setDepartment] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const defaultSubmitLabel = variant === 'appointment' ? 'Send Message' : 'Send Now';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || trimmedName.length < 2) {
      setSubmitStatus('error');
      setSubmitMessage('Please enter your name (at least 2 characters).');
      return;
    }
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setSubmitStatus('error');
      setSubmitMessage('Please enter a valid email address.');
      return;
    }
    if (!trimmedMessage || trimmedMessage.length < 10) {
      setSubmitStatus('error');
      setSubmitMessage('Please enter a message (at least 10 characters).');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');

    const { firstName, lastName } = splitFullName(trimmedName);
    const messageBody = appendFormExtras(trimmedMessage, {
      phone,
      website: variant === 'contact' ? website : undefined,
      department: variant === 'appointment' ? department : undefined,
    });
    const finalMessageBody = inquiryContext?.trim()
      ? `Inquiry: ${inquiryContext.trim()}\n\n${messageBody}`
      : messageBody;

    const payload = buildContactFormPayload({
      firstName,
      lastName,
      messageBody: finalMessageBody,
      senderEmail: trimmedEmail,
    });

    try {
      const result = await submitContactForm(payload);
      if (result.ok) {
        setSubmitStatus('success');
        setSubmitMessage(result.message);
        setName('');
        setEmail('');
        setPhone('');
        setWebsite('');
        setDepartment('');
        setMessage('');
      } else {
        setSubmitStatus('error');
        setSubmitMessage(result.message);
      }
    } catch {
      setSubmitStatus('error');
      setSubmitMessage('Failed to send message. Please try again or email us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const statusBlock =
    submitStatus !== 'idle' ? (
      <div
        className={`form-group col-lg-12 col-md-12 col-sm-12 globex-form-status globex-form-status--${submitStatus}`}
        role="status"
      >
        {submitMessage}
      </div>
    ) : null;

  if (variant === 'appointment') {
    return (
      <div className="appointment-form">
        <form id={formId} onSubmit={handleSubmit} noValidate>
          <div className="row clearfix">
            <div className="col-lg-6 col-md-6 col-sm-12 form-group">
              <input
                type="text"
                name="username"
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isSubmitting}
              />
              <span className="icon fa fa-user"></span>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 form-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
              />
              <span className="icon fa fa-envelope"></span>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 form-group">
              <input
                type="tel"
                name="phone"
                placeholder="Phone No"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={isSubmitting}
              />
              <span className="icon fa fa-phone"></span>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 form-group">
              <input
                type="text"
                name="department"
                placeholder="Department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                disabled={isSubmitting}
              />
              <span className="icon fa fa-home"></span>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 form-group">
              <textarea
                name="message"
                placeholder="Message"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={isSubmitting}
              />
            </div>
            {statusBlock}
            <div className="col-lg-12 col-md-12 col-sm-12 form-group">
              <button
                className="theme-btn btn-style-three"
                type="submit"
                name="submit-form"
                disabled={isSubmitting}
              >
                <span className="txt">{isSubmitting ? 'Sending…' : submitLabel ?? defaultSubmitLabel}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="contact-form">
      <form id={formId} onSubmit={handleSubmit} noValidate>
        <div className="row clearfix">
          <div className="form-group col-lg-6 col-md-6 col-sm-12">
            <label>Your name *</label>
            <input
              type="text"
              name="username"
              placeholder=""
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
          <div className="form-group col-lg-6 col-md-6 col-sm-12">
            <label>Email address *</label>
            <input
              type="email"
              name="email"
              placeholder=""
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
          <div className="form-group col-lg-6 col-md-6 col-sm-12">
            <label>Phone number</label>
            <input
              type="text"
              name="phone"
              placeholder=""
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
          <div className="form-group col-lg-6 col-md-6 col-sm-12">
            <label>Website</label>
            <input
              type="text"
              name="subject"
              placeholder=""
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
          <div className="form-group col-lg-12 col-md-12 col-sm-12">
            <label>Your Message *</label>
            <textarea
              name="message"
              placeholder=""
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
          {statusBlock}
          <div className="form-group text-center col-lg-12 col-md-12 col-sm-12">
            <button
              className="theme-btn btn-style-three"
              type="submit"
              name="submit-form"
              disabled={isSubmitting}
            >
              <span className="txt">{isSubmitting ? 'Sending…' : submitLabel ?? defaultSubmitLabel}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
