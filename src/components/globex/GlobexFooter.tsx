import Link from 'next/link';
import GlobexLogo from '@/components/globex/GlobexLogo';
import GlobexSocialLinks from '@/components/globex/GlobexSocialLinks';
import { SITE_CONTACT } from '@/lib/siteContact';

const FOOTER_QUICK_LINKS = [
  { label: 'Managed IT services', href: '/services/it-consultancy' },
  { label: 'Cloud Services', href: '/services' },
  { label: 'IT support & helpdesk', href: '/services/it-consultancy' },
  { label: 'Cyber security', href: '/services/qa-testing' },
  { label: 'Custom Software', href: '/services/web-development' },
  { label: 'Free Consultation', href: '/contact-us' },
  { label: 'Our Business Growth', href: '/about-us' },
] as const;

const FOOTER_RECENT_POSTS = [
  {
    title: 'Agentic Frameworks for Modern Enterprise Apps',
    image: '/images/resource/post-thumb-3.jpg',
    date: 'Jul 01, 2026',
  },
  {
    title: 'AI Automation Strategies for Business Growth',
    image: '/images/resource/post-thumb-4.jpg',
    date: 'Jun 15, 2026',
  },
] as const;

export default function GlobexFooter() {
  return (
    <>
      {/* Main Footer */}
        <footer className="main-footer">
          <div className="pattern-layer-one" style={{ backgroundImage: 'url(/images/background/pattern-7.png)' }}></div>
          <div className="pattern-layer-two" style={{ backgroundImage: 'url(/images/background/pattern-8.png)' }}></div>
          {/*Waves end*/}
          <div className="auto-container">
            {/*Widgets Section*/}
            <div className="widgets-section">
              <div className="row clearfix">

                {/* Column */}
                <div className="big-column col-lg-6 col-md-12 col-sm-12">
                  <div className="row clearfix">

                    {/* Footer Column */}
                    <div className="footer-column col-lg-7 col-md-6 col-sm-12">
                      <div className="footer-widget logo-widget">
                        <div className="logo">
                          <GlobexLogo variant="footer" />
                        </div>
                        <div className="text">We are the best world Information Technology Company. Providing the highest quality in hardware & Network solutions. About more than 25 years of experience and 1000 of innovative achievements.</div>
                        {/* Social Box */}
                        <GlobexSocialLinks variant="footer" />
                      </div>
                    </div>

                    {/* Footer Column */}
                    <div className="footer-column col-lg-5 col-md-6 col-sm-12">
                      <div className="footer-widget links-widget">
                        <h5>Quick Links</h5>
                        <ul className="list-link">
                          {FOOTER_QUICK_LINKS.map(({ label, href }) => (
                            <li key={label}>
                              <Link href={href}>{label}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Column */}
                <div className="big-column col-lg-6 col-md-12 col-sm-12">
                  <div className="row clearfix">

                    {/* Footer Column */}
                    <div className="footer-column col-lg-6 col-md-6 col-sm-12">
                      <div className="footer-widget news-widget">
                        <h5>Recent Posts</h5>
                        {/* Footer Column */}
                        <div className="widget-content">
                          {FOOTER_RECENT_POSTS.map(({ title, image, date }) => (
                            <div className="post" key={title}>
                              <div className="thumb">
                                <Link href="/">
                                  <img src={image} alt="" />
                                </Link>
                              </div>
                              <h6>
                                <Link href="/">{title}</Link>
                              </h6>
                              <span className="date">{date}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Footer Column */}
                    <div className="footer-column col-lg-6 col-md-6 col-sm-12">
                      <div className="footer-widget contact-widget">
                        <h5>Contact Us</h5>
                        <ul>
                          <li>
                            <span className="icon flaticon-placeholder-2"></span>
                            <strong>Address</strong>
                            {SITE_CONTACT.address}
                          </li>
                          <li>
                            <span className="icon flaticon-phone-call"></span>
                            <strong>Phone</strong>
                            <a href={SITE_CONTACT.phoneTel}>{SITE_CONTACT.phone}</a>
                          </li>
                          <li>
                            <span className="icon flaticon-email-1"></span>
                            <strong>E-Mail</strong>
                            <a href={`mailto:${SITE_CONTACT.email}`}>{SITE_CONTACT.email}</a>
                          </li>
                        </ul>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>

            {/* Footer Bottom */}
            <div className="footer-bottom">
              <div className="auto-container">
                <div className="row clearfix">
                  {/* Column */}
                  <div className="column col-lg-6 col-md-12 col-sm-12">
                    <div className="copyright">Copyright &copy; {SITE_CONTACT.companyName} All Rights Reserved.</div>
                  </div>
                  {/* Column */}
                  <div className="column col-lg-6 col-md-12 col-sm-12">
                    <ul className="footer-nav">
                      <li><Link href="/about-us">About Us</Link></li>
                      <li><Link href="/services">Services</Link></li>
                      <li><a href="#">Privacy</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </footer>  {/* End Main Footer */}
    </>
  );
}
