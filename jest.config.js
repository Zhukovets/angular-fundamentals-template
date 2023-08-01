module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  roots: ['<rootDir>'],
  moduleFileExtensions: [ 'ts', 'html', 'js', 'json', 'mjs' ],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/src/environments/',
  ],
  moduleDirectories: ['node_modules', '<rootDir>'],
  moduleNameMapper: {
    '@app/(.*)$': '<rootDir>/src/app/$1',
    '@shared/(.*)$': '<rootDir>/src/app/shared/$1',
    '@features/(.*)$': '<rootDir>/src/app/features/$1',
  },
  reporters: [ "default", "jest-junit" ]
};
