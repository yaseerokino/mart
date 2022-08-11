import Application from './app';
import UserRoute from './routes/user.route';

const user = new UserRoute();

const martServer = new Application([user]);

martServer.start();
