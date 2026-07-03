/* Auto-generated from app.component.html — logo uses GlobexLogo component */
import GlobexLogo from '@/components/globex/GlobexLogo';
import { SITE_CONTACT } from '@/lib/siteContact';

export default function GlobexHeader() {
  return (
    <>
      {/* Preloader */}
      {/* Main Header*/}
      <header className="main-header header-style-one">

        {/* Header Top */}
        <div className="header-top">
          <div className="auto-container">
            <div className="clearfix">
              {/* Top Left */}
              <div className="top-left">
                {/* Info List */}
                <ul className="info-list">
                  <li><a href={`mailto:${SITE_CONTACT.email}`}><span className="icon flaticon-email"></span> {SITE_CONTACT.email}</a></li>
                  <li><a href={SITE_CONTACT.phoneTel}><span className="icon flaticon-telephone"></span> {SITE_CONTACT.phone}</a></li>
                </ul>
              </div>

              {/* Top Right */}
              <div className="top-right pull-right">
                {/* Social Box */}
                <ul className="social-box">
                  <li><a href="#" className="fa fa-facebook-f"></a></li>
                  <li><a href="#" className="fa fa-twitter"></a></li>
                  <li><a href="#" className="fa fa-dribbble"></a></li>
                  <li><a href="#" className="fa fa-google"></a></li>
                </ul>
              </div>

            </div>
          </div>
        </div>

        {/*Header-Upper*/}
        <div className="header-upper">
          <div className="auto-container clearfix">

            <div className="pull-left logo-box">
              <div className="logo"><GlobexLogo variant="header" /></div>
            </div>

            <div className="nav-outer clearfix">
              {/*Mobile Navigation Toggler*/}
              <div className="mobile-nav-toggler"><span className="icon flaticon-menu"></span></div>
              {/* Main Menu */}
              <nav className="main-menu navbar-expand-md">
                <div className="navbar-header">
                  {/* Toggle Button */}
                  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                </div>

                <div className="navbar-collapse collapse clearfix" id="navbarSupportedContent">
                  <ul className="navigation clearfix">
                    <li className="current dropdown"><a href="/">Home</a>
                     {/* <ul>
                        <li className="dropdown"><a href="#">Home Pages</a>
                          <ul>
                            <li><a href="/">Home Page 01</a></li>
                            <li><a href="index-2.html">Home Page 02</a></li>
                            <li><a href="index-3.html">Home Page 03</a></li>
                          </ul>
                        </li>
                        <li className="dropdown"><a href="#">Header styles</a>
                          <ul>
                            <li><a href="/">Header Style 01</a></li>
                            <li><a href="index-2.html">Header Style 02</a></li>
                            <li><a href="index-3.html">Header Style 03</a></li>
                            <li><a href="index-4.html">Header Style 04</a></li>
                            <li><a href="index-5.html">Header Style 05</a></li>
                            <li><a href="index-6.html">Header Style 06</a></li>
                          </ul>
                        </li>
                      </ul>*/}
                    </li>
                    <li ><a href="/about-us">About</a>
                    {/*  <ul>
                        <li><a href="/about-us">About Us</a></li>
                        <li><a href="faq.html">Faq</a></li>
                        <li><a href="price.html">Price</a></li>
                        <li><a href="team.html">Team</a></li>
                        <li><a href="testimonial.html">Testimonial</a></li>
                        <li><a href="comming-soon.html">Comming Soon</a></li>
                      </ul>*/}
                    </li>
                    <li ><a href="/services">Services</a>
                      {/*<ul>
                        <li><a href="/services">Services</a></li>
                        <li><a href="services-detail.html">Services Detail</a></li>
                      </ul>*/}
                    </li>
                   {/* <li className="dropdown"><a href="#">Projects</a>
                      <ul>
                        <li><a href="projects.html">Projects</a></li>
                        <li><a href="projects-detail.html">Projects Detail</a></li>
                      </ul>
                    </li>*/}
                   {/* <li className="dropdown"><a href="#">Shop</a>
                      <ul>
                        <li><a href="shop.html">Our Products</a></li>
                        <li><a href="shop-single.html">Product Single</a></li>
                        <li><a href="shopping-cart.html">Shopping Cart</a></li>
                        <li><a href="checkout.html">Checkout</a></li>
                        <li><a href="account.html">Account</a></li>
                      </ul>
                    </li>*/}
                    {/*<li className="dropdown"><a href="#">Blog</a>
                      <ul>
                        <li><a href="blog.html">Our Blog</a></li>
                        <li><a href="blog-classic.html">Blog Classic</a></li>
                        <li><a href="news-detail.html">Blog Single</a></li>
                        <li><a href="not-found.html">Not Found</a></li>
                      </ul>
                    </li>*/}
                    {/*<li><a href="/contact-us">Contact us</a></li>*/}
                    <li><a href="/contact-us">Contact us</a></li>

                  </ul>
                </div>
              </nav>

              {/* Main Menu End*/}
              <div className="outer-box clearfix">

                {/* Cart Box */}
                <div className="cart-box">
                  <div className="dropdown">
                    <button className="cart-box-btn dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span className="flaticon-shopping-bag-1"></span><span className="total-cart">2</span></button>
                    <div className="dropdown-menu pull-right cart-panel" aria-labelledby="dropdownMenu1">

                      <div className="cart-product">
                        <div className="inner">
                          <div className="cross-icon"><span className="icon fa fa-remove"></span></div>
                          <div className="image"><img src="/images/resource/post-thumb-1.jpg" alt="" /></div>
                          <h3><a href="shop-single.html">Flying Ninja</a></h3>
                          <div className="quantity-text">Quantity 1</div>
                          <div className="price">$99.00</div>
                        </div>
                      </div>
                      <div className="cart-product">
                        <div className="inner">
                          <div className="cross-icon"><span className="icon fa fa-remove"></span></div>
                          <div className="image"><img src="/images/resource/post-thumb-2.jpg" alt="" /></div>
                          <h3><a href="shop-single.html">Patient Ninja</a></h3>
                          <div className="quantity-text">Quantity 1</div>
                          <div className="price">$99.00</div>
                        </div>
                      </div>
                      <div className="cart-total">Sub Total: <span>$198</span></div>
                      <ul className="btns-boxed">
                        <li><a href="shoping-cart.html">View Cart</a></li>
                        <li><a href="checkout.html">CheckOut</a></li>
                      </ul>

                    </div>
                  </div>
                </div>

                {/* Search Btn */}
                <div className="search-box-btn search-box-outer"><span className="icon fa fa-search"></span></div>

                {/* Nav Btn */}
                <div className="nav-btn navSidebar-button"><span className="icon flaticon-menu-2"></span></div>

                {/* Quote Btn */}
                <div className="btn-box">
                  <a href="/contact-us" className="theme-btn btn-style-one"><span className="txt">Free Consulting</span></a>
                </div>

              </div>
            </div>

          </div>
        </div>
        {/*End Header Upper*/}

        {/* Sticky Header  */}
        <div className="sticky-header">
          <div className="auto-container clearfix">
            {/*Logo*/}
            <div className="logo pull-left">
              <GlobexLogo variant="sticky" />
            </div>
            {/*Right Col*/}
            <div className="pull-right">
              {/* Main Menu */}
              <nav className="main-menu">
                {/*Keep This Empty / Menu will come through Javascript*/}
              </nav>{/* Main Menu End*/}

              {/* Main Menu End*/}
              <div className="outer-box clearfix">

                {/* Cart Box */}
                <div className="cart-box">
                  <div className="dropdown">
                    <button className="cart-box-btn dropdown-toggle" type="button" id="dropdownMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span className="flaticon-shopping-bag-1"></span><span className="total-cart">2</span></button>
                    <div className="dropdown-menu pull-right cart-panel" aria-labelledby="dropdownMenu">

                      <div className="cart-product">
                        <div className="inner">
                          <div className="cross-icon"><span className="icon fa fa-remove"></span></div>
                          <div className="image"><img src="/images/resource/post-thumb-1.jpg" alt="" /></div>
                          <h3><a href="shop-single.html">Flying Ninja</a></h3>
                          <div className="quantity-text">Quantity 1</div>
                          <div className="price">$99.00</div>
                        </div>
                      </div>
                      <div className="cart-product">
                        <div className="inner">
                          <div className="cross-icon"><span className="icon fa fa-remove"></span></div>
                          <div className="image"><img src="/images/resource/post-thumb-2.jpg" alt="" /></div>
                          <h3><a href="shop-single.html">Patient Ninja</a></h3>
                          <div className="quantity-text">Quantity 1</div>
                          <div className="price">$99.00</div>
                        </div>
                      </div>
                      <div className="cart-total">Sub Total: <span>$198</span></div>
                      <ul className="btns-boxed">
                        <li><a href="shoping-cart.html">View Cart</a></li>
                        <li><a href="checkout.html">CheckOut</a></li>
                      </ul>

                    </div>
                  </div>
                </div>

                {/* Search Btn */}
                <div className="search-box-btn search-box-outer"><span className="icon fa fa-search"></span></div>

                {/* Nav Btn */}
                <div className="nav-btn navSidebar-button"><span className="icon flaticon-menu"></span></div>

              </div>

            </div>
          </div>
        </div>{/* End Sticky Menu */}

        {/* Mobile Menu  */}
        <div className="mobile-menu">
          <div className="menu-backdrop"></div>
          <div className="close-btn"><span className="icon flaticon-multiply"></span></div>

          <nav className="menu-box">
            <div className="nav-logo"><GlobexLogo variant="mobile" /></div>
            <div className="menu-outer">{/*Here Menu Will Come Automatically Via Javascript / Same Menu as in Header*/}</div>
          </nav>
        </div>{/* End Mobile Menu */}

      </header>
      {/* End Main Header */}
    </>
  );
}
