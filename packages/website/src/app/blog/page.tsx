import { getSortedPostsData } from '@/lib/posts';
import Image from 'next/image';

export default function BlogPage() {
  return (
    <div>
      <Posts />
    </div>
  );
}

function Posts() {
  const posts = getSortedPostsData();

  return (
    <div>
      <h1 className={'mb-10 text-3xl font-semibold'}>Blog</h1>
      <div className={'grid md:grid-cols-2 gap-6'}>
        {posts.map((post, index) => (
          <Post
            key={index}
            title={post.title}
            subtitle={post.subtitle}
            id={post.id}
            avatar={post.avatar}
            picture={post.picture}
            formattedDate={post.formattedDate}
          />
        ))}
      </div>
    </div>
  );
}

interface PostProps {
  id: string;
  title: string;
  subtitle: string;
  avatar: string;
  picture: string;
  formattedDate: string;
}

function Post({
  title,
  subtitle,
  id,
  avatar,
  picture,
  formattedDate,
}: PostProps) {
  return (
    <div className={''}>
      <a className="block" href={`/blog/${id}`}>
        <div className={''}>
          <Image
            src={picture}
            height={300}
            width={550}
            className={
              'col-span-2 w-full border border-darkblue-50 object-cover rounded lg:rounded-md m-[1px]'
            }
            alt=""
          />
        </div>

        <div>
          <div className={'mt-2.5 flex items-center gap-1.5 md:gap-2 lg:mt-3'}>
            <div className="flex gap-1 place-items-center">
              <div>
                <Image
                  className="rounded-full"
                  height={'26'}
                  width="26"
                  src={avatar}
                  alt={''}
                />
              </div>
              <p className="text-sm font-normal text-darkblue-800">
                Ahmed Bouhulia ·{' '}
              </p>
              <p className="text-sm font-normal text-[#6b7280]">
                <time dateTime="2024-04-11">{formattedDate}</time>
              </p>
            </div>
          </div>

          <h1 className="font-bold font-styling font-display mt-3 line-clamp-5 text-balance text-[28px] leading-tight text-xl leading-[130%] text-darkblue-900 hover:text-indigo tracking-tight">
            {title}
          </h1>

          <div className={'mt-[4px] text-[#6b7280] text-[15px]'}>
            {subtitle}
          </div>
        </div>
      </a>
    </div>
  );
}
