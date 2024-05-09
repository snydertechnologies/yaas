import { AppUrl } from '@/constants';
import React from 'react';

export function CTASection() {
  return (
    <div className="py-[90px] md:py-[100px]">
      <div className={'container mx-auto'}>
        <h1 className="max-w-800 font-extrabold mx-auto text-center text-[28px] leading-tight md:text-[35px] lg:text-[40px] lg:max-w-[70%] text-darkblue-800">
          {`Let's see what Bigcapital software can do for your business.`}
        </h1>

        <div className="text-center mt-4 md:mt-6">
          <a
            className="w-full md:w-auto inline-block h-[44px] text-lg leading-[44px] rounded-full px-10 bg-indigo text-white hover:bg-indigo-dark"
            href={AppUrl.SignUp}
          >
            Start Accounting
          </a>
        </div>
      </div>
    </div>
  );
}
