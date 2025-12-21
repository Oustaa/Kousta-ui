import {
  ComponentPropsWithRef,
  ElementType,
  PropsWithChildren,
  useEffect,
  useRef,
} from "react";
import { WindowBoundaryProps } from "./_props";

type AsProp<T extends ElementType> = {
  As?: T;
} & Omit<ComponentPropsWithRef<T>, "as" | "children">;

type WindowBoundaryComponent = <T extends ElementType = "div">(
  props: PropsWithChildren<WindowBoundaryProps & AsProp<T>>,
) => JSX.Element;

const WindowBoundary: WindowBoundaryComponent = ({
  onItemEnter,
  onItemExit,
  onceItemEnter,
  onceItemExit,
  children,
  root = document.querySelector("body"),
  threshold = 0,
  As = "div",
}) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const onceRef = useRef({
    onceItemEnter,
    onceItemExit,
  });

  useEffect(() => {
    onceRef.current.onceItemEnter = onceItemEnter;
    onceRef.current.onceItemExit = onceItemExit;
  }, [onceItemEnter, onceItemExit]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onItemEnter?.(targetRef.current);
          if (onceRef.current.onceItemEnter) {
            onceRef.current.onceItemEnter(targetRef.current);
            onceRef.current.onceItemEnter = undefined;
          }
        } else {
          onItemExit?.(targetRef.current);
          if (onceRef.current.onceItemExit) {
            onceRef.current.onceItemExit(targetRef.current);
            onceRef.current.onceItemExit = undefined;
          }
        }
      },
      { root, threshold: threshold },
    );

    if (targetRef.current) observer.observe(targetRef.current);

    return () => {
      if (targetRef.current) observer.unobserve(targetRef.current);
    };
  }, []);

  const Component = As as ElementType;

  return <Component ref={targetRef}>{children}</Component>;
};

export default WindowBoundary;
