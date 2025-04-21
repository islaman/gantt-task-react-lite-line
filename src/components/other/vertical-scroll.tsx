import React, { SyntheticEvent, useRef, useEffect } from "react";
import styles from "./vertical-scroll.module.css";

export const VerticalScroll: React.FC<{
  scroll: number;
  ganttHeight: number;
  ganttFullHeight: number;
  headerHeight: number;
  rtl: boolean;
  onScroll: (event: SyntheticEvent<HTMLDivElement>) => void;
}> = ({
  scroll,
  ganttHeight,
  ganttFullHeight,
  headerHeight,
  rtl,
  onScroll,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Restaurar scroll guardado al montar
  // Restaurar scroll guardado al montar o cuando cambie ganttFullHeight
useEffect(() => {
  const saved = localStorage.getItem("ganttScrollTop");
  const savedTimestamp = localStorage.getItem("ganttScrollTimestamp");
  const currentTime = Date.now();
  
  // Solo restaurar si el scroll se guardó hace menos de 30 segundos
  if (scrollRef.current && saved && savedTimestamp) {
    const timestamp = parseInt(savedTimestamp);
    if (currentTime - timestamp < 30000) { // 30 segundos
      scrollRef.current.scrollTop = parseInt(saved);
      console.log(`Posición restaurada: ${saved}px`);
    }
  }
}, [ganttFullHeight]); // Añadir ganttFullHeight como dependencia


  // Aplicar scroll si cambia prop `scroll`
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scroll;
    }
  }, [scroll]);

  // Guardar scroll al hacer scroll manual
  const handleScroll = (e: SyntheticEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    localStorage.setItem("ganttScrollTop", String(el.scrollTop));
    onScroll(e); // mantener comportamiento existente
  };

  return (
    <div
      style={{
        height: ganttHeight,
        marginTop: headerHeight,
        marginLeft: rtl ? "" : "-1rem",
      }}
      className={styles.scroll}
      onScroll={handleScroll}
      ref={scrollRef}
    >
      <div style={{ height: ganttFullHeight, width: 1 }} />
    </div>
  );
};
