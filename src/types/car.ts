export interface Car {
  id: number;
  tipo: string;          // Hatch, Sedan, Suv, Pick Up
  classificacao: string; // Hatch Básico, Sedan Executivo, etc.
  cambio: string;        // Manual, Automatico
  motorizacao: string;   // 1.0, 1.0 >
  modelos: string;       // Lista de modelos como string
  curtoPrazo: string;    // BRL 000,00 ou Sob Consulta
  mensal1000: string;    // BRL 0.000,00 ou Sob Consulta
  mensal2000: string;    // BRL 0.000,00 ou Sob Consulta
  mensal3000: string;    // BRL 0.000,00 ou Sob Consulta
  mensal4000: string;    // BRL 0.000,00 ou Sob Consulta
  mensal5000: string;    // BRL 0.000,00 ou Sob Consulta
  imageUrl?: string;     // URL da imagem do veículo (opcional)
}