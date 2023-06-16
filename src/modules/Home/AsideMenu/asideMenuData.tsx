import { FiPackage } from 'react-icons/fi';
import { BiNews } from 'react-icons/bi';
import { MdOutlineAssignment } from 'react-icons/md';
import { TbTruck, TbFileInvoice } from 'react-icons/tb';

export const menuLinks = [
  { linkName: 'Loads', link: '/loads', icon: <FiPackage /> },
  { linkName: 'News', link: '/news', icon: <BiNews /> },
  { linkName: 'Orders', link: '/orders', icon: <MdOutlineAssignment /> },
  { linkName: 'Cars', link: '/cars', icon: <TbTruck /> },
  { linkName: 'Invoices', link: '/invoices', icon: <TbFileInvoice /> },
];

export const infoLinks = [
  { linkName: 'Terms of use', link: '/' },
  { linkName: 'Contact us', link: '/' },
  { linkName: 'Privacy and cookies', link: '/' },
  { linkName: 'Help', link: '/' },
];
