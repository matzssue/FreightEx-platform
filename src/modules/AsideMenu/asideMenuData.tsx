import { FiPackage } from "react-icons/fi";
import { BiNews } from "react-icons/bi";
import { MdAssignment } from "react-icons/md";
import { FaTruck, FaFileInvoice } from "react-icons/fa";

export const menuLinks = [
  { linkName: "Loads", link: "/loads", icon: <FiPackage /> },
  { linkName: "News", link: "/news", icon: <BiNews /> },
  { linkName: "Orders", link: "/orders", icon: <MdAssignment /> },
  { linkName: "Cars", link: "/cars", icon: <FaTruck /> },
  { linkName: "Invoices", link: "/invoices", icon: <FaFileInvoice /> },
];

export const infoLinks = [
  { linkName: "Terms of use", link: "/" },
  { linkName: "Contact us", link: "/" },
  { linkName: "Privacy and cookies", link: "/" },
  { linkName: "Help", link: "/" },
];
