import type { QuizQuestion } from "@/lib/types";

// Reto Conecta — 14 questions, verbatim from conecta-os/quiz.html.
// `ref` points to the in-app route to review the answer.
export const QUIZ: QuizQuestion[] = [
  {
    q: "Regla de oro #1 del OS: 'Lo que no está en HubSpot…'",
    options: ["…se registra mañana", "…no existe", "…se anota en Excel", "…lo recuerda Carlos"],
    answer: 1,
    why: "No hay forecast, ni soporte, ni comisión sin registro. Es la Regla 1 del sistema.",
    ref: "/recursos",
  },
  {
    q: "¿Cuántos proyectos simultáneos puede llevar un PM como máximo?",
    options: ["2", "4 (máx 1 misión crítica)", "8", "Los que aguante"],
    answer: 1,
    why: "WIP de implementación: 4 proyectos, y solo 1 de misión crítica tipo Hermes/SPEI.",
    ref: "/proceso/DL.P03",
  },
  {
    q: "¿Cuándo arranca el proceso de renovación de un contrato?",
    options: ["Cuando el cliente llama", "30 días antes", "90 días antes (T-90)", "Al vencerse"],
    answer: 2,
    why: "El workflow de HubSpot crea el deal a T-90. La factura nunca es la primera noticia.",
    ref: "/proceso/CM.P04",
  },
  {
    q: "Te llega un MQL de una campaña. ¿En cuánto tiempo debes contactarlo?",
    options: ["Cuando haya hueco", "Esta semana", "En menos de 24 horas", "En 48 horas"],
    answer: 2,
    why: "SLA del handoff H02: contacto en < 24 h referenciando la pieza que descargó (C01).",
    ref: "/blueprints",
  },
  {
    q: "Terminas una reunión con un cliente. ¿Qué DEBES hacer el mismo día?",
    options: [
      "Nada, ya quedó en mi cabeza",
      "Nota en HubSpot + minuta C03 + task futura",
      "Avisarle a mi jefe",
      "Publicarlo en LinkedIn",
    ],
    answer: 1,
    why: "3 bullets en HubSpot, minuta al cliente en 24 h y next step con dueño y fecha.",
    ref: "/proceso/CM.P03",
  },
  {
    q: "¿Calificación mínima para aprobar el assessment de certificación de una línea?",
    options: ["60%", "70%", "80%", "100%"],
    answer: 2,
    why: "80%. Y si todos sacan 100%, el examen era demasiado fácil (CM.P01.E02).",
    ref: "/proceso/CM.P01",
  },
  {
    q: "¿Cuántos criterios BANT-F necesita un lead para volverse SQL?",
    options: ["2 de 5", "3 de 5", "4 de 5", "5 de 5"],
    answer: 2,
    why: "≥ 4/5. Con 3 va a nurturing de Marketing; con menos, descarte con motivo.",
    ref: "/proceso/CM.P02",
  },
  {
    q: "Recibes un handoff incompleto de otra área. ¿Qué haces?",
    options: [
      "Lo aceptas para no pelear",
      "Lo completas tú",
      "Lo rechazas con lista de faltantes el mismo día",
      "Se lo cuentas al CEO",
    ],
    answer: 2,
    why: "Derecho de rechazo: el emisor corrige en 48 h. Rechazar no es conflicto — aceptar basura sí (diferido).",
    ref: "/proceso/CM.P02",
  },
  {
    q: "Incidente S1 (producción caída): ¿cada cuánto se comunica avance al cliente?",
    options: ["Cada 2 horas", "Una vez al día", "Cuando haya novedad", "Cuando pregunte"],
    answer: 0,
    why: "Cada 2 h hasta el workaround. El cliente nunca debería preguntar '¿cómo va?'.",
    ref: "/proceso/DL.P04",
  },
  {
    q: "¿Máximo de días entre la firma del contrato y el kickoff con el cliente?",
    options: ["5", "10", "20", "30"],
    answer: 1,
    why: "≤ 10 días hábiles, con bienvenida C06 en las primeras 24 h. Y el cliente no repite NADA.",
    ref: "/proceso/DL.P02",
  },
  {
    q: "Un rol opera al 85% de su capacidad durante un mes. ¿Qué pasa?",
    options: [
      "Nada, aguanta",
      "Se le aplaude",
      "Se dispara decisión de contratar o redistribuir",
      "Se le quitan vacaciones",
    ],
    answer: 2,
    why: "Regla del 80%: saturación sostenida 4 semanas = decisión en el Comité. Antes de que la experiencia se degrade.",
    ref: "/proceso/OP.P01",
  },
  {
    q: "¿Qué necesita una PoC ANTES de arrancar?",
    options: [
      "Ganas y café",
      "Criterios de éxito firmados por el cliente",
      "Un contrato",
      "Permiso del fabricante",
    ],
    answer: 1,
    why: "Sin criterios por escrito, la PoC se vuelve consultoría gratis infinita.",
    ref: "/proceso/DL.P01",
  },
  {
    q: "Deal de hardware criptográfico: ¿qué se requiere ANTES de enviar la propuesta al cliente?",
    options: [
      "Que lo apruebe el vendedor",
      "Triple Vo.Bo.: técnico + financiero + negocio",
      "Solo la cotización de Thales",
      "Nada, se envía y ya",
    ],
    answer: 1,
    why: "Líder técnico del equipo de fabricante, CFO (con FX validado) y Dirección. Sin triple autorización la propuesta no sale — y sale el mismo día que se autoriza.",
    ref: "/proceso/CM.P03",
  },
  {
    q: "El HSM llegó de Thales. ¿Cuándo se le entrega al cliente?",
    options: [
      "En cuanto llega",
      "Cuando el PM tenga tiempo",
      "Cuando el pago está confirmado (entrega vs pago)",
      "Cuando firme el contrato",
    ],
    answer: 2,
    why: "Entrega contra pago (Fase A de DL.P03): el CFO valida antes de liberar, y todo el trayecto queda con trazabilidad: serie, custodio, transporte y firma.",
    ref: "/proceso/DL.P03",
  },
];
