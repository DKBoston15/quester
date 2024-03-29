import { Price } from 'types';
import { Project } from './types';

export const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    'http://localhost:3000/';
  // Make sure to include `https://` when not localhost.
  url = url.includes('http') ? url : `https://${url}`;
  // Make sure to including trailing `/`.
  url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
  return url;
};

export const postData = async ({
  url,
  data
}: {
  url: string;
  data?: { price: Price };
}) => {
  console.log('posting,', url, data);

  const res: Response = await fetch(url, {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    credentials: 'same-origin',
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    console.log('Error in postData', { url, data, res });

    throw Error(res.statusText);
  }

  return res.json();
};

export const toDateTime = (secs: number) => {
  var t = new Date('1970-01-01T00:30:00Z'); // Unix epoch start.
  t.setSeconds(secs);
  return t;
};

export const findItemByName = (items: any, name: string) => {
  return items.find((item: any) => item.name === name);
};

export const getNameOrOriginal = (value: any): string | typeof value => {
  return typeof value === 'object' && value !== null && 'name' in value
    ? value.name
    : value;
};

export function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export const getProjectById = (id: any, projects: Project[]) => {
  if (projects) {
    const project = projects.find((project) => project.id === id);
    if (project) {
      return project;
    }
  }
  return 'Project not found';
};
