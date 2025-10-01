function Footer() {
  return (
    <footer className="relative w-full bg-gray-900 text-gray-200 py-8 px-6 text-center">
      <div className="space-y-2">
        <b className="text-lg font-semibold block">
          Excel Work Project &copy; {new Date().getFullYear()}
        </b>
        <p className="text-sm">Developer: Shah Husain</p>
        <p className="text-sm">
          &nbsp; Email:
          <a
            href="mailto:shahhusain.jmi@gmail.com"
            className="text-blue-400 hover:text-blue-500 transition-colors duration-200"
          >
            &nbsp; shahhusain.jmi@gmail.com
          </a>
        </p>
        {/* <p className="text-sm">
          Follow me on:
          <a
            href="https://www.linkedin.com/in/shahhusain/"
            className="text-blue-400 hover:text-blue-500 transition-colors duration-200"
          >
            &nbsp; LinkedIn
          </a>
        </p> */}
        <p className="text-sm">Call me: &nbsp; {"+91-7906630474"}</p>
        <p className="text-sm text-green-400 font-semibold">Thank You....!</p>
      </div>
    </footer>
  );
}

export default Footer;
