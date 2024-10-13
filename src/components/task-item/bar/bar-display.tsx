import React from "react";
import style from "./bar.module.css";

type BarDisplayProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  isSelected: boolean;
  /* progress start point */
  progressX: number;
  progressWidth: number;
  barCornerRadius: number;
  styles: {
    backgroundColor: string;
    backgroundSelectedColor: string;
    progressColor: string;
    progressSelectedColor: string;
  };
  onMouseDown: (event: React.MouseEvent<SVGPolygonElement, MouseEvent>) => void;
};

export const BarDisplay: React.FC<BarDisplayProps> = ({
  x,
  y,
  width,
  height,
  isSelected,
  progressX,
  progressWidth,
  barCornerRadius,
  styles,
  onMouseDown,
}) => {
  const getBarColor = () => {
    // Si el progreso es 100%, usa el patrón de cuadrados
    if (progressWidth >= width) {
      return "url(#checker-pattern)";
    }
    return isSelected ? styles.backgroundSelectedColor : styles.backgroundColor;
  };

  const getProcessColor = () => {
    return isSelected ? styles.progressSelectedColor : styles.progressColor;
  };

  return (
    <g onMouseDown={onMouseDown}>
      <svg width="0" height="0">
        <defs>
          <pattern id="checker-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
            <rect width="5" height="5" fill="black" />
            <rect x="5" y="5" width="5" height="5" fill="black" />
          </pattern>
        </defs>
      </svg>
      <rect
        x={x}
        width={width}
        y={y}
        height={height}
        ry={barCornerRadius}
        rx={barCornerRadius}
        fill={getBarColor()} // Ahora aplicamos el patrón aquí
        className={style.barBackground}
      />
      <rect
        x={progressX}
        width={progressWidth}
        y={y}
        height={height}
        ry={barCornerRadius}
        rx={barCornerRadius}
        fill={getProcessColor()}
      />
    </g>
  );
};
