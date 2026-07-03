/* Auto-generated from app.component.html — logo uses GlobexLogo component */
import Link from 'next/link';
import GlobexLogo from '@/components/globex/GlobexLogo';
import GlobexNavMenu from '@/components/globex/GlobexNavMenu';
import GlobexSocialLinks from '@/components/globex/GlobexSocialLinks';
import { SITE_CONTACT } from '@/lib/siteContact';

export default function GlobexHeader() {
  return (
    <>
      <header className="main-header header-style-one">
        <div className="header-top">
          <div className="auto-container">
            <div className="clearfix">
              <div className="top-left">
                <ul className="info-list">
                  <li>
                    <a href={`mailto:${SITE_CONTACT.email}`}>
                      <span className="icon flaticon-email"></span> {SITE_CONTACT.email}
                    </a>
                  </li>
                  <li>
                    <a href={SITE_CONTACT.phoneTel}>
                      <span className="icon flaticon-telephone"></span> {SITE_CONTACT.phone}
                    </a>
                  </li>
                </ul>
              </div>
              <div className="top-right pull-right">
                <GlobexSocialLinks variant="header" />
              </div>
            </div>
          </div>
        </div>

        <div className="header-upper">
          <div className="auto-container clearfix">
            <div className="pull-left logo-box">
              <div className="logo">
                <GlobexLogo variant="header" />
              </div>
            </div>

            <div className="nav-outer clearfix">
              <div className="mobile-nav-toggler">
                <span className="icon flaticon-menu"></span>
              </div>
              <nav className="main-menu navbar-expand-md">
                <div className="navbar-header">
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                </div>
                <div className="navbar-collapse collapse clearfix" id="navbarSupportedContent">
                  <GlobexNavMenu />
                </div>
              </nav>

              <div className="outer-box clearfix">
                <div className="search-box-btn search-box-outer">
                  <span className="icon fa fa-search"></span>
                </div>
                <div className="btn-box">
                  <Link href="/contact-us" className="theme-btn btn-style-one">
                    <span className="txt">Free Consulting</span>
                  </Link>
                </div>
                <div className="nav-btn navSidebar-button">
                  <span className="icon flaticon-menu-2"></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky-header">
          <div className="auto-container clearfix">
            <div className="logo pull-left">
              <GlobexLogo variant="sticky" />
            </div>
            <div className="pull-right">
              <nav className="main-menu"></nav>
              <div className="outer-box clearfix">
                <div className="search-box-btn search-box-outer">
                  <span className="icon fa fa-search"></span>
                </div>
                <div className="btn-box">
                  <Link href="/contact-us" className="theme-btn btn-style-one">
                    <span className="txt">Free Consulting</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mobile-menu">
          <div className="menu-backdrop"></div>
          <div className="close-btn">
            <span className="icon flaticon-multiply"></span>
          </div>
          <nav className="menu-box">
            <div className="nav-logo">
              <GlobexLogo variant="mobile" />
            </div>
            <div className="menu-outer"></div>
          </nav>
        </div>
      </header>
    </>
  );
}
