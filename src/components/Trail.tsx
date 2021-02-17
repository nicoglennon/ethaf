import React, { ReactElement } from "react";
import { useTrail, animated, interpolate } from "react-spring";

interface Props {
  children?: ReactElement | Array<ReactElement>;
}

const styles = {
  //   zIndex: "auto",
};

const Trail: React.FC<Props> = ({ children, ...props }) => {
  const items = React.Children.toArray(children);
  const trail = useTrail(items.length, {
    from: { opacity: 0, y: 10 },
    to: { opacity: 1, y: 0 },
  });
  return (
    <>
      {trail.map(({ y, ...rest }: any, index: number) => (
        <animated.div
          //@ts-ignore
          key={items[index].key}
          style={{
            ...rest,
            ...styles,
            transform: interpolate([y], (y: number) => `translate(0,${y}px)`),
          }}
        >
          {items[index]}
        </animated.div>
      ))}
    </>
  );
};

export default Trail;
