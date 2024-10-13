import React from "react";
import style from "./bar.module.css";

type BarDisplayProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  isSelected: boolean;
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

  // El color del texto cambia si el progreso está completo
  const textColor = isProgressComplete ? "#000" : "#fff"; // Negro si el progreso es 100%, blanco en otro caso.

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
        fill={isProgressComplete ? "url(#gridPattern)" : getProcessColor()}
      />

      {/* Texto de la barra */}
      <text
        x={x + width / 2}
        y={y + height / 2}
        fill={textColor} // Cambia el color del texto según el progreso
        dominantBaseline="middle"
        textAnchor="middle"
        className={style.barLabel} // Usa la clase existente para el estilo del texto
      >
        {isProgressComplete ? "Completado" : "En progreso"} {/* Texto de ejemplo */}
      </text>
    </g>
  );
};
