import GlobexLogo from '@/components/globex/GlobexLogo';
import GlobexSocialLinks from '@/components/globex/GlobexSocialLinks';
import { SITE_CONTACT } from '@/lib/siteContact';

export default function GlobexInfoSidebar() {
  return (
    <div className="xs-sidebar-group info-group">
      <div className="xs-overlay xs-bg-black"></div>
      <div className="xs-sidebar-widget">
        <div className="sidebar-widget-container">
          <div className="widget-heading">
            <a href="#" className="close-side-widget" aria-label="Close sidebar">
              X
            </a>
          </div>
          <div className="sidebar-textwidget">
            <div className="sidebar-info-contents">
              <div className="content-inner">
                <div className="logo">
                  <GlobexLogo variant="mobile" />
                </div>
                <div className="content-box">
                  <h2>About Giventa</h2>
                  <p className="text">
                    Giventa delivers professional IT solutions, consulting, and managed services for businesses that
                    need reliable technology partners.
                  </p>
                  <a href="/contact-us" className="theme-btn btn-style-two">
                    <span className="txt">Free Consultation</span>
                  </a>
                </div>
                <div className="contact-info">
                  <h2>Contact Info</h2>
                  <ul className="list-style-one">
                    <li>
                      <span className="icon fa fa-location-arrow"></span>
                      {SITE_CONTACT.address}
                    </li>
                    <li>
                      <span className="icon fa fa-phone"></span>
                      {SITE_CONTACT.phone}
                    </li>
                    <li>
                      <span className="icon fa fa-envelope"></span>
                      {SITE_CONTACT.email}
                    </li>
                    <li>
                      <span className="icon fa fa-clock-o"></span>
                      {SITE_CONTACT.hours}
                    </li>
                  </ul>
                </div>
                <GlobexSocialLinks variant="sidebar" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
