const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen">
      {/* Page Content */}
      <main>{children}</main>
    </div>
  );
};

export default Layout;
