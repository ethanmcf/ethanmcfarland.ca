import { useEffect, useState } from "react";

const MOBILE_QUERY = "(max-width: 767px)";

export function matchesMobile() {
  return (
    typeof window !== "undefined" && window.matchMedia(MOBILE_QUERY).matches
  );
}

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(matchesMobile);

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    function handleChange(event: MediaQueryListEvent) {
      setIsMobile(event.matches);
    }
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  return isMobile;
}
