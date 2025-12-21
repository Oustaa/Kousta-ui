export type WindowBoundaryProps = {
  onItemEnter?: (element: Element | null) => void;
  onItemExit?: (element: Element | null) => void;
  onceItemEnter?: (element: Element | null) => void;
  onceItemExit?: (element: Element | null) => void;
  root?: Element | Document | null;
  As?: string;
  threshold?: number;
};
