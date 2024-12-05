export default {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
	},
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest',
	},
	testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};
