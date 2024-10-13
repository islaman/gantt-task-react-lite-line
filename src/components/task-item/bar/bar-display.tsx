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
  const getProcessColor = () => {
    return isSelected ? styles.progressSelectedColor : styles.progressColor;
  };

  const getBarColor = () => {
    return isSelected ? styles.backgroundSelectedColor : styles.backgroundColor;
  };

  // Detectamos si el progreso es del 100%
  const isProgressComplete = progressWidth >= width;

  return (
    <g onMouseDown={onMouseDown}>
      {/* Definimos el patrón de cuadros si el progreso es del 100% */}
      <defs>
        <pattern
          id="gridPattern"
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          {/* Color de fondo del patrón igual al color de progreso */}
          <rect width="10" height="10" fill={getProcessColor()} />
          {/* Los cuadros se mantienen blancos */}
          <rect width="5" height="5" fill="white" />
          <rect x="5" y="5" width="5" height="5" fill="white" />
        </pattern>
      </defs>

      {/* Fondo de la barra */}
      <rect
        x={x}
        width={width}
        y={y}
        height={height}
        ry={barCornerRadius}
        rx={barCornerRadius}
        fill={getBarColor()}
        className={style.barBackground}
      />

      {/* Barra de progreso con patrón o color */}
      <rect
        x={progressX}
        width={progressWidth}
        y={y}
        height={height}
        ry={barCornerRadius}
        rx={barCornerRadius}
        fill={isProgressComplete ? "url(#gridPattern)" : getProcessColor()} // Aplicar el patrón si el progreso está completo
      />
    </g>
  );
};
