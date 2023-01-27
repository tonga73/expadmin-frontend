import * as React from "react";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";

export default function CustomizedTooltip({
  children,
  title,
  placement,
  componentsProps,
}) {
  const positionRef = React.useRef({
    x: 0,
    y: 0,
  });
  const popperRef = React.useRef(null);
  const areaRef = React.useRef(null);

  const handleMouseMove = (event) => {
    positionRef.current = { x: event.clientX, y: event.clientY };

    if (popperRef.current != null) {
      popperRef.current.update();
    }
  };

  return (
    <Tooltip
      title={title}
      placement={placement}
      componentsProps={componentsProps}
      enterNextDelay={500}
      PopperProps={{
        popperRef,
        anchorEl: {
          getBoundingClientRect: () => {
            return new DOMRect(
              positionRef.current.x,
              areaRef.current.getBoundingClientRect().y,
              0,
              0
            );
          },
        },
      }}
    >
      <Box width="min-content" ref={areaRef} onMouseMove={handleMouseMove}>
        {children}
      </Box>
    </Tooltip>
  );
}
