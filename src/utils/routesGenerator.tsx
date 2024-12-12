import { TRoute, TRoutes } from "../types/index.type";

export const routesGenerator = (paths: TRoutes[]): TRoute[] => {
  return paths.reduce((acc: TRoute[], item) => {
    if (item.name && item.path && !item.children) {
      acc.push({
        path: item.path,
        element: item.element,
      });
    }

    if (item.name && item.children) {
      item.children.forEach((child) => {
        acc.push({
          path: child.path!,
          element: child.element,
        });
      });
    }

    return acc;
  }, []);
};
