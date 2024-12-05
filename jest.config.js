export default {
	preset: 'ts-jest',
	testEnvironment: 'jsdom', // Pour tester le DOM dans un environnement navigateur simulé
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1', // Alias pour correspondre à votre configuration Vite
	},
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest', // Transformation TypeScript
	},
	testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};
