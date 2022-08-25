import Application from './app';
import UserRoute from './routes/user.route';
import SessionRoute from './routes/session.route';

const users = new UserRoute();
const sessions = new SessionRoute();
const martServer = new Application([users, sessions]);

martServer.start();
