import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="wrapper flex-center flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
        <Link href="/">
          <Image 
            src="/assets/images/logo.svg"
            width={128}
            height={38}
            alt="Evently"
          />
        </Link>
        <p>&copy; {new Date().getFullYear()} Evently. All Rights Reserved.</p>
      </div>
    </footer>
  )
};

export default Footer;