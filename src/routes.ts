export interface Route {
  name?: string;
  description?: string;
  // path with no slashes:
  path: string;
  // If it's included in the nav bar, supply an activeIndex
  activeIndex?: number;
  subRoutes: Route[];
}

export const routes = [
  {
    name: 'Blog',
    description: 'Blog home page',
    path: 'blog',
    isIncludedInNav: false,
    subRoutes: [
      {
        description: 'A page that lists blog posts',
        path: ':pageNum',
        isIncludedInNav: false,
        subRoutes: [],
      },
      {
        description: 'The parent route of all blog posts',
        path: 'posts',
        isIncludedInNav: false,
        subRoutes: [
          {
            name: 'Blog Post Year',
            path: ':year',
            isIncludedInNav: false,
            subRoutes: [
              {
                name: 'Blog Post Slug',
                path: ':slug',
                isIncludedInNav: false,
                subRoutes: [],
              },
            ],
          },
        ],
      },
    ],
  },
  //   {
  //     name: '',
  //     path: '',
  //     isIncludedInNav: true,
  //     subRoutes: [],
  //   },
];

export const tmproutes = [
  {
    name: 'Home',
    path: '/',
    activeIndex: 1,
    subRoutes: [
      {
        name: 'Blog Home',
        path: 'blog',
        isIncludedInNav: false,
        subRoutes: [
          {
            name: 'Blog Page',
            path: ':number',
            isIncludedInNav: false,
            subRoutes: [],
          },
          {
            name: 'Blog Posts',
            path: 'posts',
            isIncludedInNav: false,
            subRoutes: [
              {
                name: 'Blog Post Year',
                path: ':year',
                isIncludedInNav: false,
                subRoutes: [
                  {
                    name: 'Blog Post Slug',
                    path: ':slug',
                    isIncludedInNav: false,
                    subRoutes: [],
                  },
                ],
              },
            ],
          },
        ],
      },
      //   {
      //     name: '',
      //     path: '',
      //     isIncludedInNav: true,
      //     subRoutes: [],
      //   },
    ],
  },
];

type RouteDict = { [path: string]: Route };
type AddRouteToDictFactory = (
  prefix?: string,
) => (accumulatorDict: RouteDict, route: Route) => RouteDict;

const addRouteToDictFactory: AddRouteToDictFactory = (prefix = '') => {
  return (accumulatorDict, route) => {
    const newPrefix = `${prefix}/${route.path}`;
    accumulatorDict[newPrefix] = route;

    if (route.subRoutes.length === 0) {
      return accumulatorDict;
    } else {
      return {
        ...accumulatorDict,
        ...route.subRoutes.reduce(addRouteToDictFactory(newPrefix), {}),
      };
    }
  };
};

export const routeDict = routes.reduce(addRouteToDictFactory(), {});

export const getRouteByAbsPath = (absPath: string) => {
  const route = routeDict[absPath];
  if (route === undefined) {
    throw new Error(`Could not find route for ${absPath}`);
  }
  return route;
};
