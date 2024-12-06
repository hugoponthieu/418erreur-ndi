export default {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
		'\\.(css|less|scss|sass)$': 'identity-obj-proxy',
	},
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest',
		'^.+\\.[tj]sx?$': 'babel-jest',
	},
	testPathIgnorePatterns: ['/node_modules/', '/dist/'],
	collectCoverage: true,
	coverageDirectory: 'coverage',
	coverageReporters: ['html', 'text', 'json-summary'],
};
