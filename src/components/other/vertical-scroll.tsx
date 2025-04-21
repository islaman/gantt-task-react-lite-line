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
  useEffect(() => {
    const saved = localStorage.getItem("ganttScrollTop");
    if (scrollRef.current && saved) {
      scrollRef.current.scrollTop = parseInt(saved);
    }
  }, []);

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
