export const SortList = ({ list }: { list: string[] }) => {
  return (
    <ul>
      {list.map((item) => (
        <li>{item}</li>
      ))}
    </ul>
  );
};
