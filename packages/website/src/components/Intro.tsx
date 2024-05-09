import { AppUrl } from '@/constants';
import Link from 'next/link';
import React from 'react';

/**
 * Homepage - Introduction.
 */
export default function Page() {
  return (
    <div
      className={
        'text-center py-[60px] md:py-[80px] animate__animated animate__fadeIn'
      }
    >
      <div className="container lg-auto mx-auto px-4">
        <h1
          className={
            'text-[32px] leading-[36px] sm:text-[40px] sm:leading-[50px] lg:text-[50px] lg:leading-[64px] md:text-[45px] md:leading-[54px]  font-extrabold text-darkblue-700 mx-auto mb-[10px] tracking-tight text-center md:max-w-[90%] '
          }
        >
          Online accounting software, built to automate business financial
          processes.
        </h1>

        <h2
          className={
            'md:text-[20px] md:leading-8 font-normal text-blue-900 mx-auto mb-[25px] text-center md:max-w-[80%] sm:text-[16px] sm:leading-[26px]'
          }
        >
          Control your business bookkeeping with automated accounting, to run
          intelligent reports for faster decision-making.
        </h2>

        <div
          className={
            'text-center flex gap-3 md:gap-4 justify-center flex-col md:flex-row'
          }
        >
          <Link
            className={
              'inline-block h-[44px] text-lg leading-[44px] rounded-full px-5 bg-indigo text-white hover:bg-indigo-dark w-full md:w-auto'
            }
            href={AppUrl.SignUp}
          >
            Start Accounting
          </Link>

          <Link
            className={
              'inline-block rounded-full text-lg text-darkblue-900 px-5 border border-darkblue-700 text-darkblue-600 h-[44px] leading-[44px] hover:text-white hover:bg-darkblue-600 w-full md:w-auto'
            }
            href="https://docs.bigcapital.app/deployment/docker"
            target="_blank"
          >
            Self Host
          </Link>
        </div>
      </div>
    </div>
  );
}
