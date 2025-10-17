interface NavItem {
  name: string;
  path: string;
  roles: string[];
}

export const navItems: NavItem[] = [
  { name: 'Members', path: '/members', roles: ['ADMIN', 'TREASURER', 'AUDITOR'] },
  { name: 'Dues', path: '/dues', roles: ['ADMIN', 'TREASURER', 'MEMBER'] },
  
  { name: 'Events', path: '/events', roles: ['ADMIN', 'MEMBER'] },
  { name: 'Reports', path: '/reports', roles: ['ADMIN', 'AUDITOR'] },
];
