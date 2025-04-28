import { Car } from '../types/car';

// Mock data based on the table provided
const initialCars: Car[] = [
  {
    id: 1,
    tipo: 'Hatch',
    classificacao: 'Hatch Básico',
    cambio: 'Manual',
    motorizacao: '1.0',
    modelos: 'Mobi | Kwid | ou similares',
    curtoPrazo: 'BRL 160,00',
    mensal1000: 'BRL 2.200,00',
    mensal2000: 'BRL 2.350,00',
    mensal3000: 'BRL 2.500,00',
    mensal4000: 'BRL 2.650,00',
    mensal5000: 'BRL 2.850,00',
    imageUrl: 'https://images.pexels.com/photos/13861/IMG_3496bfree.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 2,
    tipo: 'Hatch',
    classificacao: 'Hatch Intermediário',
    cambio: 'Manual',
    motorizacao: '1.0',
    modelos: 'Polo | Hb20 | Argo | ou similares',
    curtoPrazo: 'BRL 180,00',
    mensal1000: 'BRL 2.400,00',
    mensal2000: 'BRL 2.600,00',
    mensal3000: 'BRL 2.800,00',
    mensal4000: 'BRL 2.950,00',
    mensal5000: 'BRL 3.150,00',
    imageUrl: 'https://images.pexels.com/photos/17249697/pexels-photo-17249697/free-photo-of-a-black-hyundai-hb20-on-display.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 3,
    tipo: 'Hatch',
    classificacao: 'Hatch Automático',
    cambio: 'Automatico',
    motorizacao: '1.0 >',
    modelos: 'HB20 | 208 | ou similares',
    curtoPrazo: 'BRL 210,00',
    mensal1000: 'BRL 3.350,00',
    mensal2000: 'BRL 3.500,00',
    mensal3000: 'BRL 3.650,00',
    mensal4000: 'BRL 3.800,00',
    mensal5000: 'BRL 4.050,00',
    imageUrl: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 4,
    tipo: 'Hatch',
    classificacao: 'Hatch Elétrico',
    cambio: 'Automatico',
    motorizacao: '1.0 >',
    modelos: 'Leaf | Fiat 500e | ou similares',
    curtoPrazo: 'Sob Consulta',
    mensal1000: 'Sob Consulta',
    mensal2000: 'Sob Consulta',
    mensal3000: 'Sob Consulta',
    mensal4000: 'Sob Consulta',
    mensal5000: 'Sob Consulta',
    imageUrl: 'https://images.pexels.com/photos/11259238/pexels-photo-11259238.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 5,
    tipo: 'Sedan',
    classificacao: 'Sedan Básico',
    cambio: 'Manual',
    motorizacao: '1.0',
    modelos: 'Logan | Prisma | Versa | ou similares',
    curtoPrazo: 'BRL 180,00',
    mensal1000: 'BRL 2.550,00',
    mensal2000: 'BRL 2.700,00',
    mensal3000: 'BRL 2.900,00',
    mensal4000: 'BRL 3.050,00',
    mensal5000: 'BRL 3.200,00',
    imageUrl: 'https://images.pexels.com/photos/15009042/pexels-photo-15009042/free-photo-of-car-renault-logan.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 6,
    tipo: 'Sedan',
    classificacao: 'Sedan Automático',
    cambio: 'Automatico',
    motorizacao: '1.0 >',
    modelos: 'Virtus | Onix Plus | Versa | ou similares',
    curtoPrazo: 'BRL 230,00',
    mensal1000: 'BRL 3.450,00',
    mensal2000: 'BRL 3.600,00',
    mensal3000: 'BRL 3.850,00',
    mensal4000: 'BRL 4.000,00',
    mensal5000: 'BRL 4.200,00',
    imageUrl: 'https://images.pexels.com/photos/11801347/pexels-photo-11801347.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 7,
    tipo: 'Sedan',
    classificacao: 'Sedan Executivo',
    cambio: 'Automatico',
    motorizacao: '1.0 >',
    modelos: 'Corolla | Cruze | ou similares',
    curtoPrazo: 'BRL 400,00',
    mensal1000: 'BRL 4.750,00',
    mensal2000: 'BRL 4.950,00',
    mensal3000: 'BRL 5.150,00',
    mensal4000: 'BRL 5.300,00',
    mensal5000: 'BRL 5.550,00',
    imageUrl: 'https://images.pexels.com/photos/11797373/pexels-photo-11797373.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 8,
    tipo: 'Suv',
    classificacao: 'SUV Básico',
    cambio: 'Automatico',
    motorizacao: '1.0 >',
    modelos: 'C4 | Creta | 2008 | Kicks | ou similares',
    curtoPrazo: 'BRL 220,00',
    mensal1000: 'BRL 3.450,00',
    mensal2000: 'BRL 3.650,00',
    mensal3000: 'BRL 3.850,00',
    mensal4000: 'BRL 4.000,00',
    mensal5000: 'BRL 4.300,00',
    imageUrl: 'https://images.pexels.com/photos/12402642/pexels-photo-12402642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 9,
    tipo: 'Suv',
    classificacao: 'SUV Intermediário',
    cambio: 'Automatico',
    motorizacao: '1.0 >',
    modelos: 'T-Cross | Renegade | ou similares',
    curtoPrazo: 'BRL 240,00',
    mensal1000: 'BRL 3.700,00',
    mensal2000: 'BRL 3.950,00',
    mensal3000: 'BRL 4.200,00',
    mensal4000: 'BRL 4.400,00',
    mensal5000: 'BRL 4.700,00',
    imageUrl: 'https://images.pexels.com/photos/12379356/pexels-photo-12379356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 10,
    tipo: 'Pick Up',
    classificacao: 'Pick Up Básica',
    cambio: 'Manual',
    motorizacao: '1.0 >',
    modelos: 'Strada | Saveiro | ou similares',
    curtoPrazo: 'BRL 220,00',
    mensal1000: 'BRL 3.200,00',
    mensal2000: 'BRL 3.400,00',
    mensal3000: 'BRL 3.600,00',
    mensal4000: 'BRL 3.900,00',
    mensal5000: 'BRL 4.350,00',
    imageUrl: 'https://images.pexels.com/photos/15654096/pexels-photo-15654096/free-photo-of-fiat-strada-volcano-cabine-dupla.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];

// Simulating database with localStorage
const initializeDatabase = (): void => {
  if (!localStorage.getItem('cars')) {
    localStorage.setItem('cars', JSON.stringify(initialCars));
  }
};

// Get cars from localStorage
export const fetchCars = async (): Promise<Car[]> => {
  return new Promise((resolve) => {
    initializeDatabase();
    setTimeout(() => {
      const cars = JSON.parse(localStorage.getItem('cars') || '[]');
      resolve(cars);
    }, 500); // Simulate network delay
  });
};

// Add a new car
export const addCar = async (car: Omit<Car, 'id'>): Promise<Car> => {
  return new Promise((resolve) => {
    initializeDatabase();
    setTimeout(() => {
      const cars = JSON.parse(localStorage.getItem('cars') || '[]');
      const newId = cars.length > 0 ? Math.max(...cars.map((c: Car) => c.id)) + 1 : 1;
      const newCar = { ...car, id: newId };
      cars.push(newCar);
      localStorage.setItem('cars', JSON.stringify(cars));
      resolve(newCar);
    }, 500);
  });
};

// Update a car
export const updateCar = async (id: number, updates: Partial<Car>): Promise<Car> => {
  return new Promise((resolve, reject) => {
    initializeDatabase();
    setTimeout(() => {
      const cars = JSON.parse(localStorage.getItem('cars') || '[]');
      const index = cars.findIndex((c: Car) => c.id === id);
      
      if (index === -1) {
        reject(new Error('Veículo não encontrado'));
      } else {
        const updatedCar = { ...cars[index], ...updates };
        cars[index] = updatedCar;
        localStorage.setItem('cars', JSON.stringify(cars));
        resolve(updatedCar);
      }
    }, 500);
  });
};

// Delete a car
export const deleteCar = async (id: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    initializeDatabase();
    setTimeout(() => {
      const cars = JSON.parse(localStorage.getItem('cars') || '[]');
      const index = cars.findIndex((c: Car) => c.id === id);
      
      if (index === -1) {
        reject(new Error('Veículo não encontrado'));
      } else {
        cars.splice(index, 1);
        localStorage.setItem('cars', JSON.stringify(cars));
        resolve();
      }
    }, 500);
  });
};

// API for ItsMob client
export const getItsMobResponse = async (requestType: string, period: string): Promise<{ message: string; cars: Car[] }> => {
  return new Promise((resolve) => {
    initializeDatabase();
    setTimeout(() => {
      const cars = JSON.parse(localStorage.getItem('cars') || '[]');
      
      // Custom message for ItsMob client
      const message = "Os preços são aproximados e podem variar de acordo com a disponibilidade e período de locação.";
      
      resolve({
        message,
        cars
      });
    }, 500);
  });
};