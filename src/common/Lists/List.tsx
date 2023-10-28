export const List = ({ list }: { list: string[] }) => (
  <ul>
    {list.map((item, i) => (
      <li key={i + item}>{item}</li>
    ))}
  </ul>
);
