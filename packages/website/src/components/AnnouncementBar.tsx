import { AppUrl } from "@/constants";

export function AnnouncementBar() {
  return (
    <div className="hidden fixed bg-[#2d72d2] h-[32px] top-0 left-0 right-0 bg-blue-600 text-white px-4 md:flex items-center justify-center z-50 text-sm">
      <span className="bg-[#00cfb7] px-[6px] py-[2px] rounded-md text-black text-xs mr-3">
        New
      </span>
      {
        "We've launched the Bigcapital Cloud, the 200 early adopter subscribers will get all the features and unlimited users. "
      }
      <a
        className={
          'bg-white px-[6px] py-[2px] rounded-md inline-block text-black leading-none text-[13px] ml-4 hover:underline'
        }
        href={AppUrl.SignUp}
      >
        Subscribe $29
      </a>
    </div>
  );
}
