import { useEffect } from 'react';

const ScrollToTopOnReloadAndRouteChange = () => {

  useEffect(() => {
    const handleScrollToTop = () => {
      window.scrollTo(0, 0);
    };

    // Scroll to top when the component is mounted (route change)
    window.scrollTo(0, 0);



    // Scroll to top when the page is about to be reloaded
    const handleBeforeUnload = () => {
      handleScrollToTop();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return null;
};

export default ScrollToTopOnReloadAndRouteChange;
