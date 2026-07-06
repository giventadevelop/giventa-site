import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import GlobexContactForm from '@/components/globex/GlobexContactForm';
import { getServiceBySlug, SERVICE_DETAILS } from '@/lib/serviceDetails';

type ServiceDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return SERVICE_DETAILS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) {
    return { title: 'Service Not Found' };
  }
  return {
    title: `${service.title} | Giventa Services`,
    description: service.summary,
  };
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) {
    notFound();
  }

  return (
    <>
      <section className="page-title">
        <div className="pattern-layer-one" style={{ backgroundImage: 'url(/images/background/pattern-16.png)' }}></div>
        <div className="auto-container">
          <h2>{service.title}</h2>
          <ul className="page-breadcrumb">
            <li><Link href="/">home</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li>{service.title}</li>
          </ul>
        </div>
      </section>

      <section className="about-section">
        <div className="auto-container">
          <div className="sec-title">
            <div className="title">GIVENTA SERVICES</div>
            <h2>{service.title}</h2>
          </div>
          <p className="text">{service.summary}</p>
          {service.body.map((paragraph) => (
            <p className="text" key={paragraph}>
              {paragraph}
            </p>
          ))}
          <div className="btn-box" style={{ marginTop: 24 }}>
            <Link href="/contact-us" className="theme-btn btn-style-one">
              <span className="txt">Request a Consultation</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="appointment-section style-two">
        <div className="image-layer" style={{ backgroundImage: 'url(/images/background/4.jpg)' }}></div>
        <div className="auto-container">
          <div className="sec-title light centered">
            <div className="title">CONTACT US</div>
            <h2>Ask About {service.title}</h2>
          </div>
          <div className="inner-container">
            <div className="row clearfix">
              <div className="form-column col-lg-8 col-md-12 col-sm-12" style={{ margin: '0 auto' }}>
                <div className="inner-column">
                  <GlobexContactForm
                    variant="appointment"
                    formId={`service-${slug}-contact-form`}
                    submitLabel="Send Inquiry"
                    inquiryContext={service.title}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
