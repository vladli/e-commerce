import type { Role } from '~/nextauth';

export const categories = ref([
  {
    name: 'PC',
    code: 'PC',
    subCategory: [
      {
        name: 'Components',
        items: [
          { cname: 'CPU', code: 'cpu' },
          { cname: 'Motherboard', code: 'motherboard' },
          { cname: 'GPU', code: 'gpu' }
        ]
      }
    ]
  }
]);

type MenuItem = {
  name: string;
  path?: string;
  icon: string;
  roles?: string[] | undefined;
  children?: MenuItem[];
};

export const mainMenu: MenuItem[] = [
  {
    name: 'Main Menu',
    icon: 'material-symbols:dashboard',
    children: [
      {
        name: 'Home',
        path: '/',
        icon: ''
      },
      {
        name: 'About',
        path: '/about',
        icon: ''
      }
    ]
  },
  {
    name: 'Admin Menu',
    icon: 'eos-icons:admin-outlined',
    roles: ['admin'],
    children: [
      {
        name: 'All Products',
        icon: '',
        path: '/admin/products/dashboard'
      },
      {
        name: 'All Users',
        icon: '',
        path: '/admin/users'
      }
    ]
  }
  // {
  //   name: 'Categories',
  //   icon: '',
  //   children: categories.value.map((category) => ({
  //     name: category.name,
  //     icon: '',
  //     path: `/categories/${category.code}`,
  //     children: category.subCategory.map((subCategory) => ({
  //       name: subCategory.name,
  //       icon: '',
  //       path: `/categories/${category.code}/${subCategory.name}`,
  //       children: subCategory.items.map((item) => ({
  //         name: item.cname,
  //         icon: '',
  //         path: `/categories/${category.code}/${subCategory.name}/${item.cname}`
  //       }))
  //     }))
  //   }))
  // }
];
