module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://dunder_mifflin:password@localhost/strongly',
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postgresql://dunder_mifflin:password@localhost/strongly-test',
    JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret',
    FOODDATA_KEY: process.env.FOODDATA_KEY || 'bOYu0Q6KsOkT3fQbNsTLBLY21eh5C15dkc1NdE0w'
  }