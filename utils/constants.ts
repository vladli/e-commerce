type MenuItem = {
  name: string;
  path?: string;
  icon: string;
  children?: MenuItem[];
};

export const mainMenu: MenuItem[] = [
  {
    name: "Main Menu",
    icon: "",
    children: [
      {
        name: "Home",
        path: "/",
        icon: "material-symbols:dashboard",
      },
      {
        name: "About",
        path: "/about",
        icon: "material-symbols:info",
      },
    ],
  },
  {
    name: "Admin Menu",
    icon: "",
    children: [
      {
        name: "All Products",
        icon: "fluent-mdl2:product",
        path: "/admin/products/dashboard",
      },
    ],
  },
];
