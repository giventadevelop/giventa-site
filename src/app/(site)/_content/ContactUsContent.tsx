/* Auto-generated from Angular template — do not edit by hand; run npm run convert:templates */
import { SITE_CONTACT } from '@/lib/siteContact';
import GlobexContactForm from '@/components/globex/GlobexContactForm';

export default function ContactUsContent() {
  return (
    <>
      {/*Page Title*/}
      <section className="page-title">
        <div className="pattern-layer-one" style={{ backgroundImage: 'url(/images/background/pattern-16.png)' }}></div>
        <div className="auto-container">
          <h2>Contact us</h2>
          <ul className="page-breadcrumb">
            <li><a href="/">home</a></li>
            <li>Contact us</li>
          </ul>
        </div>
      </section>
      {/*End Page Title*/}

      {/* Contact Info Section */}
      <section className="contact-info-section">
        <div className="auto-container">
          {/* Sec Title */}
          <div className="title-box">
            <div className="title">GET IN TOUCH</div>
            <h2>Contact Giventa Today</h2>
            <div className="text">For genereal enquires you can touch with our front desk supporting team <br /> at <a href={`mailto:${SITE_CONTACT.email}`}>{SITE_CONTACT.email}</a> or call on <a href={SITE_CONTACT.phoneTel}>{SITE_CONTACT.phone}</a></div>
          </div>

          <div className="row clearfix">

            {/* Info Column */}
            <div className="info-column col-lg-4 col-md-6 col-sm-12">
              <div className="inner-column">
                <div className="content">
                  <div className="icon-box"><span className="flaticon-pin"></span></div>
                  <ul>
                    <li><strong>Address</strong></li>
                    <li>{SITE_CONTACT.address}</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Info Column */}
            <div className="info-column col-lg-4 col-md-6 col-sm-12">
              <div className="inner-column">
                <div className="content">
                  <div className="icon-box"><span className="flaticon-phone-call"></span></div>
                  <ul>
                    <li><strong>Phone</strong></li>
                    <li><a href={SITE_CONTACT.phoneTel}>{SITE_CONTACT.phone}</a></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Info Column */}
            <div className="info-column col-lg-4 col-md-6 col-sm-12">
              <div className="inner-column">
                <div className="content">
                  <div className="icon-box"><span className="flaticon-email-1"></span></div>
                  <ul>
                    <li><strong>E-Mail</strong></li>
                    <li><a href={`mailto:${SITE_CONTACT.email}`}>{SITE_CONTACT.email}</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="lower-text">We are at 36 places over the country, <a href="#">see our branches.</a></div>
        </div>
      </section>
      {/* End Contact Info Section */}

      {/* Map Section */}
      <section className="contact-map-section">
        <div className="auto-container">
          {/* Map Boxed */}
          <div className="map-boxed">
            {/*Map Outer*/}
            <div className="map-outer">
              <iframe
                title={`Map: ${SITE_CONTACT.address}`}
                src={SITE_CONTACT.mapEmbedSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>
      {/* End Map Section */}

      {/* Contact Map Section */}
      <section className="contact-map-section">
        <div className="auto-container">
          {/* Sec Title */}
          <div className="sec-title">
            <div className="clearfix">
              <div className="pull-left">
                <div className="title">SEND YOUR MESSAGE</div>
                <h2>Send Your Message</h2>
              </div>
              <div className="pull-right">
                <div className="text">Our goal is to help our companies maintain or achieve best- in-class <br /> positions in their respective industries and our team works.</div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <GlobexContactForm variant="contact" formId="contact-form" />
          {/* End Contact Form */}

        </div>
      </section>
      {/* End Contact Map Section */}
    </>
  );
}
