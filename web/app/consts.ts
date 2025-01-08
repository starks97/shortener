export const baseUrl =
  "https://strange-clio-skycodegraphics-ad08cb4e.koyeb.app";

export const workspace = `/workspace?offset=1&limit=10&category=All`;

export const navigateWorkSpace = {
  pathname: "/workspace",
  search: "?offset=1&limit=10&category=All",
};

export const modalNavigateActions = {
  view: (id: string) => {
    return {
      pathname: `/workspace/${id}`,
      search: "?modal=view",
    };
  },
  qr: (id: string) => {
    return {
      pathname: `/workspace/${id}`,
      search: "?modal=qr",
    };
  },
};
