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

  // Comprobamos si el progreso está completo
  const isProgressComplete = progressX + progressWidth >= x + width;

  console.log('Progress Complete:', isProgressComplete);

  return (
    <g onMouseDown={onMouseDown}>
      {/* Definimos el patrón de cuadros si el progreso está completo */}
      <defs>
        {isProgressComplete && (
          <pattern
            id="gridPattern"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <rect width="5" height="5" fill={getBarColor()} />
            <rect x="5" y="5" width="5" height="5" fill={getBarColor()} />
          </pattern>
        )}
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

      {/* Barra de progreso */}
      <rect
        x={progressX}
        width={progressWidth}
        y={y}
        height={height}
        ry={barCornerRadius}
        rx={barCornerRadius}
        fill={getProcessColor()}
      />

      {/* Si el progreso está completo, aplicamos el patrón de cuadros */}
      {isProgressComplete && (
        <rect
          x={progressX}
          width={progressWidth}
          y={y}
          height={height}
          ry={barCornerRadius}
          rx={barCornerRadius}
          fill="url(#gridPattern)"
        />
      )}
    </g>
  );
};
