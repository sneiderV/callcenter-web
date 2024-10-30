/**
 * Pre-production & Development environment configuration
 */

const backendUser = 'http://localhost:9876/users';
const backendIncidents = 'http://localhost:9877/incidents';
const backendChatbot = 'http://localhost:9878/chat';

export const environment = {
 production: false,
 backendUser,
 backendIncidents,
 backendChatbot
};
