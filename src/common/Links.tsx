const Links = ({ data }) => {
  return (
    <ul>
      {data.map((link) => (
        <li key={link.linkName}>
          <a href={link.link}>
            {link.icon} {link.linkName}
          </a>
        </li>
      ))}
    </ul>
  );
};
export default Links;
