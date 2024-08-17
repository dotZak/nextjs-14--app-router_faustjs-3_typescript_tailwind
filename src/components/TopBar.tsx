export const TopBar = ({
  navLabel,
  children,
}: {
  navLabel?: string;
  children: React.ReactNode;
}) => {
  return (
    <nav aria-label={navLabel ?? "Main"}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {children}
      </div>
    </nav>
  );
};

export default TopBar;
