import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';

export type LayoutFunction = (page: ReactElement) => ReactNode;

export type NextPageWithLayout = NextPage & {
  getLayout?: LayoutFunction;
};

export type PostObj = { [key: string]: any };

export type BlogPostPagePathParams = {
  params: {
    pageNum: string[];
  };
};
