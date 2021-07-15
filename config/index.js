const prod = {
    database: {
      username: process.env.PGUSER || 'postgres',
      dbname: process.env.PGDATABASE || 'sample',
      password: process.env.PGPASSWORD || '',
      host: process.env.PGHOST || 'localhost',
      port: process.env.PGPORT || 5432,
      dialect: 'postgres',
      DATABASE_URL: process.env.DATABASE_URL,
      logger:false
    }
  };
  
  const dev = {
    database: {
      username: process.env.PGUSER || 'postgres',
      dbname: process.env.PGDATABASE || 'ems',
      password: process.env.PGPASSWORD || 'laxman',
      host: process.env.PGHOST || 'localhost',
      port: process.env.PGPORT || 5432,
      dialect: 'postgres',
      DATABASE_URL: process.env.DATABASE_URL,
      logger:false
    }
  };
  
  
  module.exports = global.process.env.NODE_ENV === 'production' ? prod : dev;
  