import React from 'react';
import Link from 'next/link';
import BigcapitalAlt from '../icons/BigcapitalAlt';
// import Logo from '../Logo';

/**
 * Social media links widget.
 */
function SocialWidget() {
  return (
    <div className="grow mb-[40px] md:mb-[60px]">
      <h5 className="text-white/70 font-medium text-lg leading-6 tracking-tighter mb-[22px] mt-[2px]">
        Socials
      </h5>
      <ul className="footer__widget-list">
        <li className={'mb-2'}>
          <a target="_blank" href="https://discord.gg/c8nPBJafeb">
            Discord
          </a>
        </li>
        <li className={'mb-2'}>
          <a target="_blank" href="https://twitter.com/BigcapitalHQ">
            Twitter
          </a>
        </li>
        <li className={'mb-2'}>
          <a target="_blank" href="https://medium.com/bigcpaitalhq">
            Medium
          </a>
        </li>
        <li className={'mb-2'}>
          <a target="_blank" href="https://medium.com/linkedin">
            LinkedIn
          </a>
        </li>
      </ul>
    </div>
  );
}

function CompanyWidget() {
  return (
    <div className="grow mb-[40px] md:mb-[60px]">
      <h5 className="text-white/70text-opacity-75 font-medium text-lg leading-6 tracking-tighter mb-[22px] mt-[2px]">
        Legal
      </h5>
      <ul className="footer__widget-list">
        <li className={'mb-2'}>
          <Link href={'/legal/terms-of-use'}>Terms & conditions</Link>
        </li>
        <li className={'mb-2'}>
          <Link href={'/legal/privacy-policy'}>Privacy policy</Link>
        </li>
        <li className={'mb-2'}>
          <a target="_blank" href="https://discord.gg/c8nPBJafeb">
            Contact Us
          </a>
        </li>
      </ul>
    </div>
  );
}

function PagesWidget() {
  return (
    <div className="grow mb-[40px] md:mb-[60px]">
      <h5 className="text-white/70 font-medium text-lg leading-6 tracking-tighter mb-[22px] mt-[2px]">
        Content
      </h5>
      <ul className="footer__widget-list">
        <li className={'mb-2'}>
          <Link href={'/'}>Home</Link>
        </li>

        <li className={'mb-2'}>
          <a target="_blank" href="https://docs.bigcapital.app">
            Documentation
          </a>
        </li>

        <li>
          <a target={'_blank'} href={'https://bigcapital.statuspage.io/'}>
            Status
          </a>
        </li>
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <div className="bg-[#000931] text-white text-opacity-65 pt-[50px] text-center md:text-left">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-2 md:gap-20">
          <div className="w-full lg:w-[25%]">
            <div className="mb-[40px] md:mb-[60px]">
              <div className="mt-1 mb-6">
                <a href="#">
                  <BigcapitalAlt fill="#fff" width={180} className={'inline'} />
                </a>
              </div>
              <div className="footer-text mb-0 mt-3">
                <p>
                  Online accounting software, built to automate business
                  financial processes.
                </p>
              </div>
            </div>
          </div>

          <div className="ml-auto w-full lg:w-[60%]">
            <div className="flex flex-col md:flex-row flex-grow grow">
              <PagesWidget />
              <CompanyWidget />
              <SocialWidget />
            </div>
          </div>
        </div>
      </div>
      <div className="text-md text-white/50 tracking-tight text-center ">
        <div className="container mx-auto px-4.5">
          <div className="border-t border-white/20 pt-7 pb-7 ">
            <p>Copyright © 2024 — Made by Bigcapital Technologies.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
