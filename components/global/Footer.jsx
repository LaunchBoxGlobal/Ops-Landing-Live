import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#212121] text-white py-16 md:py-24 md:pb-10 px-6 md:px-8 midlg:px-[5%] 2xl:px-[10%]">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-10">
        {/* Left Column */}
        <div className="md:col-span-12 lg:col-span-5 flex flex-col items-start space-y-8">
          {/* Logo Badge */}
          <div className="inline-flex flex-row sm:items-center space-x-6 border border-[#CECEEA] rounded-[17px] px-3 py-2 lg:h-[57px] w-auto max-w-full">
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <Image
                  src={"/launchbox-global-white-logo.svg"}
                  alt="launchbox global logo"
                  width={192}
                  height={34}
                  //   className="w-[172px] lg:w-[192px]"
                />
              </div>
            </div>
            <div className="hidden sm:block w-px h-10 bg-zinc-500"></div>
            <p className="text-xs xl:text-[14px] font-semibold leading-snug">
              Trusted Talent,
              <br />
              Anywhere, Anytime.
            </p>
          </div>
          <p className="text-lg lg:text-[20px] xl:text-[24px] leading-[1.3] text-zinc-100 font-medium max-w-lg mt-2 lg:w-[80%]">
            Custom web and mobile software for growing service businesses.
          </p>
          {/* social icons */}
          <div className="flex space-x-3">
            <Link
              href={"https://www.facebook.com/LaunchboxGlobal"}
              target="_blank"
              className=""
            >
              <Image
                src={"/facebook-icon.png"}
                alt="facebook-icon"
                width={37}
                height={37}
              />
            </Link>
            <Link
              href={"https://www.linkedin.com/company/launchboxglobal/"}
              target="_blank"
              className=""
            >
              <Image
                src={"/linkedin-icon.png"}
                alt="linkedin-icon"
                width={37}
                height={37}
              />
            </Link>
            <Link
              href={"https://www.instagram.com/launchboxglobal/"}
              target="_blank"
              className=""
            >
              <Image
                src={"/instagram-icon.png"}
                alt="instagram-icon"
                width={37}
                height={37}
              />
            </Link>
            <Link
              href={"https://x.com/launchboxglobal/"}
              target="_blank"
              className=""
            >
              <Image
                src={"/twitter-icon.png"}
                alt="twitter-icon"
                width={37}
                height={37}
              />
            </Link>
          </div>
        </div>

        {/* Middle Column (Services) */}
        <div className="md:col-span-6 lg:col-span-4 mt-4 lg:mt-0">
          <div className="grid grid-cols-2 gap-x-6 gap-y-5 text-white/90 text-lg font-medium">
            {/* Column 1 */}
            <div className="flex flex-col">
              <h3 className="font-bold text-base">Services</h3>
              <div className="flex flex-col gap-y-6 mt-7">
                <Link
                  href={
                    "https://launchboxglobal.com/services/mobile-app-development"
                  }
                  className="text-[15px] font-medium hover:text-white transition-colors leading-none"
                >
                  Mobile App Development
                </Link>
                <Link
                  href={
                    "https://launchboxglobal.com/services/web-app-development"
                  }
                  className="text-[15px] font-medium hover:text-white transition-colors leading-none"
                >
                  Web App Development
                </Link>
                <Link
                  href={
                    "https://launchboxglobal.com/services/custom-software-development"
                  }
                  className="text-[15px] font-medium hover:text-white transition-colors leading-[1.3]"
                >
                  Custom Software Development
                </Link>
                <Link
                  href={
                    "https://launchboxglobal.com/services/ecommerce-development"
                  }
                  className="text-[15px] font-medium hover:text-white transition-colors leading-none"
                >
                  E-commerce Development
                </Link>
                <Link
                  href={
                    "https://launchboxglobal.com/software-project-rescue-service"
                  }
                  className="text-[15px] font-medium hover:text-white transition-colors leading-[1.3]"
                >
                  Software Project Rescue Service
                </Link>
                <Link
                  href={
                    "https://launchboxglobal.com/services/digital-marketing"
                  }
                  className="text-[15px] font-medium hover:text-white transition-colors leading-none"
                >
                  Digital Marketing
                </Link>
                <Link
                  href={
                    "https://launchboxglobal.com/services/branding-and-design"
                  }
                  className="text-[15px] font-medium hover:text-white transition-colors leading-none"
                >
                  Branding & Design
                </Link>
              </div>
            </div>
            {/* Column 2 */}
            <div className="flex flex-col xl:pl-10">
              <h3 className="font-bold text-base">Resources</h3>
              <div className="flex flex-col gap-y-6 mt-7">
                <Link
                  href={"https://launchboxglobal.com/blog"}
                  className="text-[15px] font-medium hover:text-white transition-colors leading-none"
                >
                  Blogs
                </Link>
                <Link
                  href={"https://launchboxglobal.com/case-studies"}
                  className="text-[15px] font-medium hover:text-white transition-colors leading-none"
                >
                  Case Studies
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Contact) */}
        <div className="md:col-span-6 lg:col-span-3 mt-4 lg:mt-0">
          <h3 className="font-bold text-xl mb-8 lg:mb-8 lg:pb-0 pb-0">
            <span className="lg:ml-2">Contact</span>
          </h3>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-4">
              <Image
                src={"/email-icon.png"}
                alt="email-icon"
                width={33}
                height={33}
                className="rounded-[12px]"
              />
              <Link
                href="mailto:hello@launchboxglobal.com"
                className="text-white hover:text-white/80 transition-colors text-[15px]"
              >
                hello@launchboxglobal.com
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Image
                src={"/call-icon.png"}
                alt="call-icon"
                width={33}
                height={33}
                className="rounded-[12px]"
              />
              <Link
                href="tel:8888688385"
                className="text-white hover:text-white/80 transition-colors text-[15px]"
              >
                (888) 868-8385
              </Link>
            </div>

            <div className="flex items-start space-x-4">
              <Image
                src={"/location-icon.png"}
                alt="location-icon"
                width={33}
                height={33}
                className="rounded-[12px]"
              />
              <p className="text-white text-[15px] leading-snug">
                1621 Central Ave, Office 8945 Cheyenne, WY 82001
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-20 pt-8 border-t border-zinc-600 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-[15px] text-zinc-300">
        <p>
          © 2026{" "}
          <Link href={"https://launchboxglobal.com"} target="_blank">
            LaunchBox Global.
          </Link>{" "}
          All Rights Reserved.
        </p>
        <div className="flex space-x-8">
          <Link
            href="https://launchboxglobal.com/privacy-policy"
            target="_blank"
            className="hover:text-white transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="https://launchboxglobal.com/terms-and-conditions"
            target="_blank"
            className="hover:text-white transition-colors"
          >
            Terms & Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
}
