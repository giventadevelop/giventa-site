/* Auto-generated from Angular template — do not edit by hand; run npm run convert:templates */
import { SITE_CONTACT } from '@/lib/siteContact';

export default function ContactUsContent() {
  return (
    <>
      {/* Sidebar Cart Item */}
      <div className="xs-sidebar-group info-group">
        <div className="xs-overlay xs-bg-black"></div>
        <div className="xs-sidebar-widget">
          <div className="sidebar-widget-container">
            <div className="widget-heading">
              <a href="#" className="close-side-widget">
                X
              </a>
            </div>
            <div className="sidebar-textwidget">

              {/* Sidebar Info Content */}
              <div className="sidebar-info-contents">
                <div className="content-inner">
                  <div className="logo">
                    <a href="/"><img src={SITE_CONTACT.logoSrc} alt="Giventa" width={SITE_CONTACT.logoWidth} height={SITE_CONTACT.logoHeight} /></a>
                  </div>
                  <div className="content-box">
                    <h2>About Us</h2>
                    <p className="text">The argument in favor of using filler text goes something like this: If you use real content in the Consulting Process, anytime you reach a review point you’ll end up reviewing and negotiating the content itself and not the design.</p>
                    <a href="#" className="theme-btn btn-style-two"><span className="txt">Consultation</span></a>
                  </div>
                  <div className="contact-info">
                    <h2>Contact Info</h2>
                    <ul className="list-style-one">
                      <li><span className="icon fa fa-location-arrow"></span>{SITE_CONTACT.address}</li>
                      <li><span className="icon fa fa-phone"></span>{SITE_CONTACT.phone}</li>
                      <li><span className="icon fa fa-envelope"></span>{SITE_CONTACT.email}</li>
                      <li><span className="icon fa fa-clock-o"></span>{SITE_CONTACT.hours}</li>
                    </ul>
                  </div>
                  {/* Social Box */}
                  <ul className="social-box">
                    <li className="facebook"><a href="#" className="fa fa-facebook-f"></a></li>
                    <li className="twitter"><a href="#" className="fa fa-twitter"></a></li>
                    <li className="linkedin"><a href="#" className="fa fa-linkedin"></a></li>
                    <li className="instagram"><a href="#" className="fa fa-instagram"></a></li>
                    <li className="youtube"><a href="#" className="fa fa-youtube"></a></li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      {/* END sidebar widget item */}

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
            <h2>A Monthly Project Fee <br /> Price Plans</h2>
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
          <div className="contact-form">

            {/* Contact Form */}
            <form method="post" action="sendemail.php" id="contact-form">
              <div className="row clearfix">

                <div className="form-group col-lg-6 col-md-6 col-sm-12">
                  <label>Your name *</label>
                  <input type="text" name="username" placeholder="" required />
                </div>

                <div className="form-group col-lg-6 col-md-6 col-sm-12">
                  <label>Email address *</label>
                  <input type="text" name="email" placeholder="" required />
                </div>

                <div className="form-group col-lg-6 col-md-6 col-sm-12">
                  <label>Phone number *</label>
                  <input type="text" name="phone" placeholder="" required />
                </div>

                <div className="form-group col-lg-6 col-md-6 col-sm-12">
                  <label>Website</label>
                  <input type="text" name="subject" placeholder="" required />
                </div>

                <div className="form-group col-lg-12 col-md-12 col-sm-12">
                  <label>Your Message *</label>
                  <textarea name="message" placeholder=""></textarea>
                </div>

                <div className="form-group text-center col-lg-12 col-md-12 col-sm-12">
                  <button className="theme-btn btn-style-three" type="submit" name="submit-form"><span className="txt">Send Now</span></button>
                </div>

              </div>
            </form>
          </div>
          {/* End Contact Form */}

        </div>
      </section>
      {/* End Contact Map Section */}
    </>
  );
}
