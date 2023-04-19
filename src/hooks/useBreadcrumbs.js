const useBreadcrumbs = (initialRoutes) => {
  const [breadcrumbs, setBreadcrumbs] = useState(initialRoutes);

  const resetBreadcrumbs = (newRoutes) => {
    setBreadcrumbs(newRoutes);
  };
  return { breadcrumbs, resetBreadcrumbs };
};

export default useBreadcrumbs;
