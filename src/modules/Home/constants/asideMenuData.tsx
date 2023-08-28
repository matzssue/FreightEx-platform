import { FiPackage } from 'react-icons/fi';
import { MdOutlineAssignment } from 'react-icons/md';
import { TbTruck, TbFileInvoice } from 'react-icons/tb';

export const menuLinks = [
  { linkName: 'Loads', link: '/loads', icon: <FiPackage />, disable: false },
  { linkName: 'Fleet', link: '/fleet', icon: <TbTruck />, disabled: false },
  { linkName: 'Orders', link: '/orders/published', icon: <MdOutlineAssignment />, disabled: false },
  { linkName: 'Invoices', link: '/invoices', icon: <TbFileInvoice />, disabled: true },
];

export const infoLinks = [
  { linkName: 'Terms of use', link: '/' },
  { linkName: 'Contact us', link: '/' },
  { linkName: 'Privacy and cookies', link: '/' },
  { linkName: 'Help', link: '/' },
];
