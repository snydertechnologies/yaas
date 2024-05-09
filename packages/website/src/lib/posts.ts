import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import dayjs from 'dayjs';
import { getAvatar } from './avatar';

// --------------------------------
// GET THE PATH OF THE POSTS FOLDER
const postsDirectory = path.join(process.cwd(), 'public/blog'); // process.cwd() returns the absolute path of the current working directory

const formatDate = (date: string) => {
  return dayjs(date).format('MMMM DD, YYYY');
};
// -------------------------------------------------
// GET THE DATA OF ALL POSTS IN SORTED ORDER BY DATE
/*
  Returns an array that looks like this:
  [
    {
      id: 'ssg-ssr',
      title: 'When to Use Static Generation v.s. Server-side Rendering',
      date: '2020-01-01'
    },
    {
      id: 'pre-rendering',
      title: 'Two Forms of Pre-rendering',
      date: '2020-01-02'
    }
  ]
*/

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory); // [ 'pre-rendering.md', 'ssg-ssr.md' ]

  // Get the data from each file
  const allPostsData = fileNames.map((filename) => {
    // Remove ".md" from file name to get id
    const id = filename.replace(/\.md$/, ''); // id = 'pre-rendering', 'ssg-ssr'

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, filename);
    // /Users/ef/Desktop/nextjs-blog/posts/pre-rendering.md
    const fileContents = fs.readFileSync(fullPath, 'utf8'); // .md string content

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    const avatar = getAvatar(matterResult.data?.authorEmail);
    const formattedDate = formatDate(matterResult.data?.date);

    // Combine the data with the id
    return {
      id,
      ...(matterResult.data as {
        date: string;
        title: string;
        subtitle: string;
        picture: string;
      }),
      avatar,
      formattedDate,
    };
  });

  // Sort posts by date and return
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

// ------------------------------------------------
// GET THE IDs OF ALL POSTS FOR THE DYNAMIC ROUTING
/*
  Returns an array that looks like this:
  [
    {
      params: {
        id: 'ssg-ssr'
      }
    },
    {
      params: {
        id: 'pre-rendering'
      }
    }
  ]
  */

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

// The returned array must have the params key otherwise `getStaticPaths` will fail

// --------------------------------
// GET THE DATA OF A SINGLE POST FROM THE ID
export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `early-adopter-plan.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  const avatar = getAvatar(matterResult.data?.authorEmail);

  const formattedDate = formatDate(matterResult.data?.date);

  // Combine the data with the id
  return {
    id,
    contentHtml,
    avatar,
    formattedDate,
    ...(matterResult.data as {
      date: string;
      title: string;
      subtitle: string;
      author: string;
      authoriEmail: string;
      picture: string;
    }),
  };
}
