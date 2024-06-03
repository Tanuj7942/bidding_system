import App from './app';
import ItemRoute from './routes/item.route';
import UserRoute from './routes/user.route';

const app = new App([new UserRoute(), new ItemRoute()]);

app.listen();
