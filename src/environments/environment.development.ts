/**
 * Pre-production environment configuration
 */

const backendUser = 'http://localhost:9876/users';
const backendIncidents = 'http://localhost:9877/incidents';

export const environment = {
 production: false,
 backendUser,
 backendIncidents
};