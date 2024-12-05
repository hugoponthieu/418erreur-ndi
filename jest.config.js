export default {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
	},
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest',
	},
	testPathIgnorePatterns: ['/node_modules/', '/dist/'],
	collectCoverage: true,
	coverageDirectory: 'coverage',
	coverageReporters: ['html', 'text'],
};
