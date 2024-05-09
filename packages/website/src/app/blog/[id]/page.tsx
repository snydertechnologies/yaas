import { getPostData } from '@/lib/posts';
import Image from 'next/image';
import './page.css';

export default async function Page() {
  const postData = await getPostData('ssg-ssr');

  return (
    <div>
      <div
        className={'text-[#79818b] text-sm animate__animated animate__fadeIn'}
      >
        <time dateTime={postData.date}>{postData.formattedDate}</time>
      </div>

      <div>
        <h1
          className={
            'font-extrabold font-styling font-display mt-1.5 mb-2.5 text-[2rem] md:text-[2.2rem] tracking-tight leading-[120%] text-[#242c51] animate__animated animate__fadeIn'
          }
        >
          {postData.title}
        </h1>
        <p
          className={
            'animate__animated animate__fadeIn text-[1.2rem] text-[#6b7280]'
          }
        >
          {postData.subtitle}
        </p>

        <div className="animate__animated animate__fadeIn mx-auto mb-6 mt-4 flex flex-row items-center gap-2">
          <span className="relative block flex-shrink-0 overflow-hidden rounded-full">
            <Image
              alt={postData.author}
              width="40"
              height="40"
              src={postData.avatar}
            />
          </span>

          <div className="flex flex-col gap-[2px]">
            <span className="sans text-sm leading-[1.6] text-slate-11 font-normal">
              {postData.author}
            </span>

            <span className={'text-xs muted text-[#6b7280]'}>
              CEO, Founder
            </span>
          </div>
        </div>
      </div>

      <div className={'animate__animated animate__fadeIn mb-6'}>
        <Image
          src={postData.picture}
          height={700}
          width={1050}
          className={
            'w-full border border-darkblue-50 object-cover rounded lg:rounded-lg'
          }
          alt=""
        />
      </div>

      <div
        className={
          'content mx-auto text-darkblue-800 leading-relaxed animate__animated animate__fadeIn'
        }
        dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
      ></div>
    </div>
  );
}
