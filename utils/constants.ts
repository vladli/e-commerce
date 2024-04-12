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
  children?: MenuItem[];
};

export const mainMenu: MenuItem[] = [
  {
    name: 'Main Menu',
    icon: '',
    children: [
      {
        name: 'Home',
        path: '/',
        icon: 'material-symbols:dashboard'
      },
      {
        name: 'About',
        path: '/about',
        icon: 'material-symbols:info'
      }
    ]
  },
  {
    name: 'Admin Menu',
    icon: '',
    children: [
      {
        name: 'All Products',
        icon: 'fluent-mdl2:product',
        path: '/admin/products/dashboard'
      }
    ]
  },
  {
    name: 'Categories',
    icon: '',
    children: categories.value.map((category) => ({
      name: category.name,
      icon: '',
      path: `/admin/categories/${category.code}`,
      children: category.subCategory.map((subCategory) => ({
        name: subCategory.name,
        icon: '',
        path: `/admin/categories/${category.code}/${subCategory.name}`,
        children: subCategory.items.map((item) => ({
          name: item.cname,
          icon: '',
          path: `/admin/categories/${category.code}/${subCategory.name}/${item.cname}`
        }))
      }))
    }))
  }
];
