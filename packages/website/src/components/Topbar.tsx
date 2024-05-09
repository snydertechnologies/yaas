'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import clsx from 'classnames';
import Logo from '../icons/Bigcapital';
import { AppUrl } from '@/constants';

interface NavItemProps {
  children: React.ReactNode;
  className?: string;
}

function NavItem({ children, className }: NavItemProps) {
  return <div className={className}>{children}</div>;
}

interface NavLinkProps {
  children: React.ReactNode;
  href: string;
  className?: string;
  target?: string;
}

function NavLink({ children, href, target, className }: NavLinkProps) {
  return (
    <Link href={href} passHref legacyBehavior>
      <a
        href="#"
        target={target}
        className={clsx(
          'inline-block lg:h-[32px] lg:leading-[32px] lg:px-[14px] font-medium  hover:text-indigo border-b-[rgba(24,34,77,0.15)] border-b border-solid lg:border-0 w-full h-[45px] leading-[45px]',
          className
        )}
      >
        {children}
      </a>
    </Link>
  );
}

interface NavButtonProps {
  variant?: 'solid' | 'outline';
  children: React.ReactNode;
  href: string;
  className?: string;
  target?: string;
}

function NavButton({
  variant = 'solid',
  children,
  href,
  target,
  className,
}: NavButtonProps) {
  const commonStyle =
    'inline-block lg:h-[32px] lg:leading-[32px] h-[45px] leading-[45px] px-[14px] font-medium  rounded-full w-full';
  const outlineStyle =
    'hover:text-indigo border border-1-darkblue-600  hover:bg-darkblue-600 hover:text-white';

  const solidStyle =
    'bg-indigo text-white lg:px-[14px] font-medium border-b-[rgba(24,34,77,0.15)] border-b border-solid lg:border-0 ';

  return (
    <Link href={href} passHref legacyBehavior>
      <a
        href="#"
        target={target}
        className={clsx(
          {
            [outlineStyle]: variant === 'outline',
            [solidStyle]: variant === 'solid',
          },
          commonStyle,
          className
        )}
      >
        {children}
      </a>
    </Link>
  );
}

interface TopBarProps {
  beforeNavbar?: React.ReactNode;
  afterNavbar?: React.ReactNode;
}

/**
 * Top navigation bar.
 */
export function TopBar({ beforeNavbar, afterNavbar }: TopBarProps) {
  const [toggle, setToggle] = useState<boolean>(false);

  const handleLinkClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // Check if the clicked element is a link
    const target = event.target as HTMLElement;
    if (target.tagName === 'A') {
      // Change the state when a link is clicked
      setToggle(false);
    }
  };

  return (
    <div onClick={handleLinkClick}>
      {beforeNavbar}

      <div className="xl:container mx-auto px-4 mx-auto">
        <div className={'py-[14px] lg:flex lg:flex-nowrap'}>
          <div className={'flex lg:block'}>
            <div className={'py-[5px]'}>
              <Link href={'/'}>
                <Logo width={200} />
              </Link>
            </div>

            <NavbarToggle onClick={() => setToggle(!toggle)} />
          </div>

          <div
            className={clsx(
              'pt-6 lg:pt-0 lg:flex flex-grow items-center lg:block',
              {
                hidden: !toggle,
                block: toggle,
              }
            )}
          >
            <div className="flex flex-col lg:flex-row ml-auto items-stretch lg:items-center">
              <NavItem className={'pb-2 lg:pb-0'}>
                <iframe
                  src="https://ghbtns.com/github-btn.html?user=bigcapitalhq&repo=bigcapital&type=star&size=large&count=true"
                  scrolling="0"
                  width="150"
                  height="30"
                  title="Bigcapital Github Repository"
                ></iframe>
              </NavItem>

              <NavItem>
                <NavLink href="/blog">Blog</NavLink>
              </NavItem>

              <NavItem>
                <NavLink href={'https://docs.bigcapital.app'} target="_blank">
                  Docs
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink href={'https://discord.gg/c8nPBJafeb'} target="_blank">
                  Community
                </NavLink>
              </NavItem>

              <div className="hidden lg:block w-[1px] h-[36px] bg-[#bec3d5] mx-1 my-auto"></div>
              {/* 
              <NavItem className={'d-none d-lg-block'}>
                <a
                  class="btn btn-outline-secondary"
                  href={'https://app.bigcapital.ly/'}
                >
                  Sign In
                </a>
              </NavItem> */}

              <NavItem className={'hidden lg:block lg:ml-4'}>
                <NavButton
                  className={'px-6'}
                  variant={'solid'}
                  href={AppUrl.SignUp}
                >
                  Sign Up
                </NavButton>
              </NavItem>

              <div className="hidden lg:block lg:ml-4 d-lg-none">
                <NavButton variant={'outline'} href={AppUrl.SignIn}>
                  Sign In
                </NavButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      {afterNavbar}
    </div>
  );
}

interface NavbarToggleProps extends React.HTMLProps<HTMLButtonElement> {}

function NavbarToggle(props: NavbarToggleProps) {
  return (
    <button
      aria-label="Toggle navigation"
      className="bg-hamburger bg-no-repeat bg-center block relative right-[-10px] lg:hidden ml-auto text-xl leading-none bg-transparent border rounded px-3 py-1 border-solid border-transparent"
      {...props}
      type={'button'}
    >
      <span className={`inline-block w-[1.5em] h-[1.5em] align-middle`}></span>
    </button>
  );
}
