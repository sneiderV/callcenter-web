/**
 * Production environment configuration
 */
const backendUser = 'http://localhost:9878/users';
const backendIncidents = 'http://localhost:9877/incidents';

export const environment = {
 production: true,
 backendUser,
 backendIncidents
};