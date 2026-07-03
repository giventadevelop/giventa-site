export default function GlobexSearchPopup() {
  return (
    <div className="search-popup">
      <button type="button" className="close-search style-two" aria-label="Close search">
        <span className="flaticon-multiply"></span>
      </button>
      <button type="button" className="close-search" aria-label="Close search">
        <span className="flaticon-up-arrow-1"></span>
      </button>
      <form method="get" action="/services" role="search">
        <div className="form-group">
          <input type="search" name="q" defaultValue="" placeholder="Search Here" required />
          <button type="submit" aria-label="Submit search">
            <i className="fa fa-search"></i>
          </button>
        </div>
      </form>
    </div>
  );
}
