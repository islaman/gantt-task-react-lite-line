import React from "react";
import { TaskItemProps } from "../task-item";
import styles from "./project.module.css";

export const Project: React.FC<TaskItemProps> = ({ task, isSelected }) => {
  const barColor = isSelected
    ? task.styles.backgroundSelectedColor
    : task.styles.backgroundColor;
  const processColor = isSelected
    ? task.styles.progressSelectedColor
    : task.styles.progressColor;
  const projectWidth = task.x2 - task.x1;

  const projectLeftTriangle = [
    task.x1,
    task.y + task.height / 2 - 1,
    task.x1,
    task.y + task.height,
    task.x1 + 15,
    task.y + task.height / 2 - 1,
  ].join(",");
  const projectRightTriangle = [
    task.x2,
    task.y + task.height / 2 - 1,
    task.x2,
    task.y + task.height,
    task.x2 - 15,
    task.y + task.height / 2 - 1,
  ].join(",");

  // Detectamos si el progreso es del 100%
  const isProgressComplete = task.progressWidth >= projectWidth;

  return (
    <g tabIndex={0} className={styles.projectWrapper}>
      {/* Definimos el patrón de cuadros si el progreso es del 100% */}
      <defs>
        <pattern
          id="gridPatternProject"
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          {/* Color de fondo del patrón igual al color de progreso */}
          <rect width="10" height="10" fill={processColor} />
          {/* Los cuadros se mantienen blancos */}
          <rect width="5" height="5" fill="white" />
          <rect x="5" y="5" width="5" height="5" fill="white" />
        </pattern>
      </defs>

      {/* Fondo del proyecto */}
      <rect
        fill={barColor}
        x={task.x1}
        width={projectWidth}
        y={task.y}
        height={task.height}
        rx={task.barCornerRadius}
        ry={task.barCornerRadius}
        className={styles.projectBackground}
      />

      {/* Progreso del proyecto con patrón o color */}
      <rect
        x={task.progressX}
        width={task.progressWidth}
        y={task.y}
        height={task.height}
        ry={task.barCornerRadius}
        rx={task.barCornerRadius}
        fill={isProgressComplete ? "url(#gridPatternProject)" : processColor}
      />

      {/* Renderizar estos elementos solo si el nombre del proyecto no es "TRAMITACIÓN" */}
      {task.name !== "TRAMITACIÓN" && (
  <React.Fragment>
    <rect
      fill={barColor}
      x={task.x1}
      width={projectWidth}
      y={task.y}
      height={task.height / 2}
      rx={task.barCornerRadius}
      ry={task.barCornerRadius}
      className={styles.projectTop}
    />
    <polygon
      className={styles.projectTop}
      points={projectLeftTriangle}
      fill={barColor}
    />
    <polygon
      className={styles.projectTop}
      points={projectRightTriangle}
      fill={barColor}
    />
  </React.Fragment>
)}

    </g>
  );
};
