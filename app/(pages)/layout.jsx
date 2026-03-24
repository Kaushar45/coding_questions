const Layout = ({ children }) => {
  return (
    <div className="min-h-screen">
      {/* Page Content */}
      <main>{children}</main>
    </div>
  );
};

export default Layout;
