import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import cors from 'cors';
import serverless from 'serverless-http';

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Database setup
let db;

async function initializeDatabase() {
  db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  });

  // Create tables if they don't exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS cars (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tipo TEXT NOT NULL,
      classificacao TEXT NOT NULL,
      cambio TEXT NOT NULL,
      motorizacao TEXT NOT NULL,
      modelos TEXT NOT NULL,
      curtoPrazo TEXT NOT NULL,
      mensal1000 TEXT NOT NULL,
      mensal2000 TEXT NOT NULL,
      mensal3000 TEXT NOT NULL,
      mensal4000 TEXT NOT NULL,
      mensal5000 TEXT NOT NULL,
      imageUrl TEXT
    );
  `);

  // Check if admin user exists, create if not
  const adminExists = await db.get('SELECT * FROM users WHERE username = ?', ['admin']);
  if (!adminExists) {
    await db.run(
      'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
      ['admin', 'admin123', 'admin']
    );
  }

  // Check if cars exist, populate with initial data if not
  const carsExist = await db.get('SELECT COUNT(*) as count FROM cars');
  if (carsExist.count === 0) {
    const initialCars = [
      {
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
      }
    ];

    for (const car of initialCars) {
      await db.run(
        `INSERT INTO cars (
          tipo, classificacao, cambio, motorizacao, modelos, 
          curtoPrazo, mensal1000, mensal2000, mensal3000, mensal4000, mensal5000, imageUrl
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          car.tipo, car.classificacao, car.cambio, car.motorizacao, car.modelos,
          car.curtoPrazo, car.mensal1000, car.mensal2000, car.mensal3000, car.mensal4000, car.mensal5000, car.imageUrl
        ]
      );
    }
  }
}

// Routes
// Authentication
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
    
    if (user) {
      res.json({ success: true, user: { id: user.id, username: user.username, role: user.role } });
    } else {
      res.status(401).json({ success: false, message: 'Credenciais inválidas' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro no servidor' });
  }
});

// Search endpoints
app.get('/api/search', async (req, res) => {
  try {
    const { 
      query,        // Busca geral (modelo, tipo, classificação)
      tipo,         // Tipo específico
      classificacao,// Classificação específica
      cambio,       // Tipo de câmbio
      minPrice,     // Preço mínimo (curto prazo)
      maxPrice,     // Preço máximo (curto prazo)
      period        // Período (curto, mensal1000, mensal2000, etc)
    } = req.query;

    let sql = 'SELECT * FROM cars WHERE 1=1';
    const params = [];

    if (query) {
      sql += ` AND (
        LOWER(modelos) LIKE LOWER(?) OR 
        LOWER(tipo) LIKE LOWER(?) OR 
        LOWER(classificacao) LIKE LOWER(?)
      )`;
      const searchTerm = `%${query}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }

    if (tipo) {
      sql += ' AND LOWER(tipo) = LOWER(?)';
      params.push(tipo);
    }

    if (classificacao) {
      sql += ' AND LOWER(classificacao) = LOWER(?)';
      params.push(classificacao);
    }

    if (cambio) {
      sql += ' AND LOWER(cambio) = LOWER(?)';
      params.push(cambio);
    }

    if (minPrice || maxPrice) {
      const priceField = period ? period : 'curtoPrazo';
      if (minPrice) {
        sql += ` AND CAST(REPLACE(REPLACE(${priceField}, 'BRL ', ''), ',', '') AS DECIMAL) >= ?`;
        params.push(parseFloat(minPrice));
      }
      if (maxPrice) {
        sql += ` AND CAST(REPLACE(REPLACE(${priceField}, 'BRL ', ''), ',', '') AS DECIMAL) <= ?`;
        params.push(parseFloat(maxPrice));
      }
    }

    const cars = await db.all(sql, params);
    res.json({
      success: true,
      count: cars.length,
      cars: cars
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro ao realizar a busca',
      error: error.message 
    });
  }
});

// Get available types
app.get('/api/types', async (req, res) => {
  try {
    const types = await db.all('SELECT DISTINCT tipo FROM cars ORDER BY tipo');
    res.json({
      success: true,
      types: types.map(t => t.tipo)
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao buscar tipos' });
  }
});

// Get available classifications
app.get('/api/classifications', async (req, res) => {
  try {
    const classifications = await db.all('SELECT DISTINCT classificacao FROM cars ORDER BY classificacao');
    res.json({
      success: true,
      classifications: classifications.map(c => c.classificacao)
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao buscar classificações' });
  }
});

// Get price ranges
app.get('/api/price-ranges', async (req, res) => {
  try {
    const period = req.query.period || 'curtoPrazo';
    const prices = await db.all(`
      SELECT 
        MIN(CAST(REPLACE(REPLACE(${period}, 'BRL ', ''), ',', '') AS DECIMAL)) as min_price,
        MAX(CAST(REPLACE(REPLACE(${period}, 'BRL ', ''), ',', '') AS DECIMAL)) as max_price
      FROM cars
      WHERE ${period} != 'Sob Consulta'
    `);
    
    res.json({
      success: true,
      range: {
        min: prices[0].min_price,
        max: prices[0].max_price
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao buscar faixas de preço' });
  }
});

// Cars - CRUD operations
app.get('/api/cars', async (req, res) => {
  try {
    const cars = await db.all('SELECT * FROM cars');
    res.json(cars);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao buscar veículos' });
  }
});

app.get('/api/cars/:id', async (req, res) => {
  try {
    const car = await db.get('SELECT * FROM cars WHERE id = ?', [req.params.id]);
    if (car) {
      res.json(car);
    } else {
      res.status(404).json({ success: false, message: 'Veículo não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao buscar veículo' });
  }
});

app.post('/api/cars', async (req, res) => {
  try {
    const {
      tipo, classificacao, cambio, motorizacao, modelos,
      curtoPrazo, mensal1000, mensal2000, mensal3000, mensal4000, mensal5000, imageUrl
    } = req.body;

    const result = await db.run(
      `INSERT INTO cars (
        tipo, classificacao, cambio, motorizacao, modelos, 
        curtoPrazo, mensal1000, mensal2000, mensal3000, mensal4000, mensal5000, imageUrl
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        tipo, classificacao, cambio, motorizacao, modelos,
        curtoPrazo, mensal1000, mensal2000, mensal3000, mensal4000, mensal5000, imageUrl
      ]
    );

    const newCar = await db.get('SELECT * FROM cars WHERE id = ?', [result.lastID]);
    res.status(201).json(newCar);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao adicionar veículo' });
  }
});

app.put('/api/cars/:id', async (req, res) => {
  try {
    const {
      tipo, classificacao, cambio, motorizacao, modelos,
      curtoPrazo, mensal1000, mensal2000, mensal3000, mensal4000, mensal5000, imageUrl
    } = req.body;

    await db.run(
      `UPDATE cars SET 
        tipo = ?, classificacao = ?, cambio = ?, motorizacao = ?, modelos = ?,
        curtoPrazo = ?, mensal1000 = ?, mensal2000 = ?, mensal3000 = ?, 
        mensal4000 = ?, mensal5000 = ?, imageUrl = ?
      WHERE id = ?`,
      [
        tipo, classificacao, cambio, motorizacao, modelos,
        curtoPrazo, mensal1000, mensal2000, mensal3000, mensal4000, mensal5000, imageUrl,
        req.params.id
      ]
    );

    const updatedCar = await db.get('SELECT * FROM cars WHERE id = ?', [req.params.id]);
    if (updatedCar) {
      res.json(updatedCar);
    } else {
      res.status(404).json({ success: false, message: 'Veículo não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao atualizar veículo' });
  }
});

app.delete('/api/cars/:id', async (req, res) => {
  try {
    const result = await db.run('DELETE FROM cars WHERE id = ?', [req.params.id]);
    if (result.changes > 0) {
      res.json({ success: true, message: 'Veículo removido com sucesso' });
    } else {
      res.status(404).json({ success: false, message: 'Veículo não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao remover veículo' });
  }
});

// Special endpoint for ItsMob client
app.get('/api/itsmob/cars', async (req, res) => {
  try {
    const cars = await db.all('SELECT * FROM cars');
    res.json({
      message: "Os preços são aproximados e podem variar de acordo com a disponibilidade e período de locação.",
      cars: cars
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao buscar veículos' });
  }
});

// Initialize database and start server
await initializeDatabase();

// Export the serverless handler
export default serverless(app);

// Only start the server if we're not in a serverless environment
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}
