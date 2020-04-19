import app from './app';
import { ServerConstants } from './config/server.constants';

app.listen(ServerConstants.PORT, () => console.log(`Server Is Listening on ${ServerConstants.SERVER_URL} PORT:${ServerConstants.PORT}`));
