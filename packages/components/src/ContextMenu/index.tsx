import {
  FC,
  useRef,
  useState,
  MouseEvent as ReactMouseEvent,
  useLayoutEffect,
} from "react";
import { ContextmenuProviderProps } from "./_props";
import { ContextMenuMenu } from "./components/ContextMenu";

const ContextmenuProvider: FC<ContextmenuProviderProps> = ({
  children,
  onClose,
  onOpen,
  options,
  disabled = false,
  As = "div",
  itemCloseOnClick = true,
  ...extraProps
}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [coordinates, setCoordinates] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [offsetsX, setOffsetsX] = useState<number>(0);
  const [offsetsY, setOffsetsY] = useState<number>(0);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose?.();
        setMenuVisible(false);
      }
    };

    const [menuHeight, menuWidth, pageHeight, pageWidth] = [
      menuRef.current?.clientHeight,
      menuRef.current?.clientWidth,
      Math.max(document.body.clientHeight, screen.availHeight),
      document.body.clientWidth,
    ];

    // debugger;
    if ((menuHeight || 0) + coordinates.y > pageHeight) {
      setCoordinates((prev) => ({ ...prev, y: prev.y }));
      setOffsetsY(menuHeight as number);
    } else {
      setOffsetsY(0);
    }

    if ((menuWidth || 0) + coordinates.x > pageWidth) {
      setCoordinates((prev) => ({ ...prev, x: prev.x }));
      setOffsetsX(menuWidth as number);
    } else {
      setOffsetsX(0);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuVisible, onClose, coordinates.y, coordinates.x]);

  const handleContextMenu = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    e.preventDefault();
    setCoordinates({ x: e.pageX, y: e.pageY });
    setMenuVisible(true);
    onOpen?.();
  };

  return (
    // @ts-expect-error this is not an error
    <As {...extraProps} onContextMenu={handleContextMenu}>
      {children}
      <div className="OuicontextMenu-Container kui-contextmenu-container">
        {menuVisible && options.length > 0 && (
          <ContextMenuMenu
            ref={menuRef}
            x={coordinates.x}
            y={coordinates.y}
            offsetY={offsetsY}
            offsetX={offsetsX}
            options={options}
            setMenuVisible={setMenuVisible}
            itemCloseOnClick={itemCloseOnClick}
            onClose={onClose}
          />
        )}
      </div>
    </As>
  );
};

export default ContextmenuProvider;
