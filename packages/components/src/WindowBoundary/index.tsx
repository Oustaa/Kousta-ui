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
  root,
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
    // `null` is the viewport. Using document.body instead would make every
    // target count as intersecting from the moment it mounts — the element is
    // inside body no matter where the page is scrolled — so nothing would ever
    // be lazy and onItemExit would never fire.
    const rootElement = root === undefined ? null : root;

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
      { root: rootElement, threshold: threshold },
    );

    if (targetRef.current) observer.observe(targetRef.current);

    return () => {
      if (targetRef.current) observer.unobserve(targetRef.current);
    };
  }, [root, threshold, onItemEnter, onItemExit]);

  const Component = As as ElementType;

  return <Component ref={targetRef}>{children}</Component>;
};

export default WindowBoundary;
