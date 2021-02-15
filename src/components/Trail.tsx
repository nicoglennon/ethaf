import React, { ReactElement } from "react";
import { useTrail, animated } from "react-spring";

interface Props {
  children?: ReactElement | Array<ReactElement>;
}

const Trail: React.FC<Props> = ({ children, ...props }) => {
  const items = React.Children.toArray(children);
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    from: { opacity: 0, y: 5 },
    to: { opacity: 1, y: 0 },
  });
  return (
    <>
      {trail.map(({ y, ...rest }: any, index) => (
        <animated.div
          //@ts-ignore
          key={items[index].key}
          style={{
            ...rest,
            transform: y.interpolate((y: number) => `translate3d(0,${y}px,0)`),
          }}
        >
          {items[index]}
        </animated.div>
      ))}
    </>
  );
};

export default Trail;
