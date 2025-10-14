interface NavItem {
  name: string;
  path: string;
  roles: string[];
}

export const navItems: NavItem[] = [
  { name: 'Dashboard', path: '/', roles: ['ADMIN', 'TREASURER', 'AUDITOR', 'MEMBER'] },
  { name: 'Members', path: '/members', roles: ['ADMIN', 'TREASURER', 'AUDITOR'] },
  { name: 'Dues', path: '/dues', roles: ['ADMIN', 'TREASURER', 'MEMBER'] },
  { name: 'Dues Summary', path: '/dues/summary', roles: ['ADMIN', 'TREASURER', 'AUDITOR'] },
  { name: 'Events', path: '/events', roles: ['ADMIN', 'MEMBER'] },
  { name: 'Transactions', path: '/transactions', roles: ['ADMIN', 'TREASURER'] },
  { name: 'Reports', path: '/reports', roles: ['ADMIN', 'AUDITOR'] },
];
