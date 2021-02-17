import React, { ReactElement } from "react";
import { useSpring, animated } from "react-spring";

interface Props {
  children?: ReactElement | Array<ReactElement>;
}

const FadeIn: React.FC<Props> = ({ children }) => {
  const fadeSpring = useSpring({
    opacity: 1,
    from: { opacity: 0 },
  });
  return (
    <>
      <animated.div style={fadeSpring}>{children}</animated.div>
    </>
  );
};

export default FadeIn;
