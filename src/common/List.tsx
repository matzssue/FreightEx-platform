export const List = ({ list }: { list: string[] }) => {
  return (
    <ul>
      {list.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
};
