import { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";

export default function AnimatedCountUp({ end,   duration,
  suffix = "",
  decimals = 0,
  separator = "",
  decimal = ".",
  className = "" }) {
  const ref = useRef(null);
  const [startCount, setStartCount] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCount(true);
          observer.disconnect(); // solo una vez
        }
      },
      { threshold: 0.5 } // 50% visible
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <span ref={ref} className={className}>
      {startCount ? (
        <CountUp
          end={end}
          duration={duration}
          suffix={suffix}
          decimal={decimal}
          decimals={decimals}
          separator={separator}
        />
      ) : (
        0
      )}
    </span>
  );
}
