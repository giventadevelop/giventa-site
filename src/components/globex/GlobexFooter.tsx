/* Auto-generated from app.component.html */
import GlobexLogo from '@/components/globex/GlobexLogo';
import { SITE_CONTACT } from '@/lib/siteContact';

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
                        <ul className="social-box">
                          <li><a href="#" className="fa fa-facebook-f"></a></li>
                          <li><a href="#" className="fa fa-linkedin"></a></li>
                          <li><a href="#" className="fa fa-twitter"></a></li>
                          <li><a href="#" className="fa fa-google"></a></li>
                        </ul>
                      </div>
                    </div>

                    {/* Footer Column */}
                    <div className="footer-column col-lg-5 col-md-6 col-sm-12">
                      <div className="footer-widget links-widget">
                        <h5>Quick Links</h5>
                        <ul className="list-link">
                          <li><a href="">Managed IT services</a></li>
                          <li><a href="">Cloud Services</a></li>
                          <li><a href="">IT support & helpdesk</a></li>
                          <li><a href="">Cyber security</a></li>
                          <li><a href="">Custom Software</a></li>
                          <li><a href="">Free Consultation</a></li>
                          <li><a href="">Our Business Growth</a></li>
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
                        <h5>Resent Post</h5>
                        {/* Footer Column */}
                        <div className="widget-content">
                          <div className="post">
                            <div className="thumb"><a href="news-detail.html"><img src="/images/resource/post-thumb-3.jpg" alt="" /></a></div>
                            <h6><a href="news-detail.html">Define World Best IT Solution Technology</a></h6>
                            <span className="date">May 01, 2020</span>
                          </div>

                          <div className="post">
                            <div className="thumb"><a href="news-detail.html"><img src="/images/resource/post-thumb-4.jpg" alt="" /></a></div>
                            <h6><a href="news-detail.html">PHP Frameworks You Need To Use Anywhere</a></h6>
                            <span className="date">May 01, 2020</span>
                          </div>
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
                      <li><a href="#">About Us</a></li>
                      <li><a href="#">Services</a></li>
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
