import * as Sentry from "@sentry/node";
import 'dotenv/config';
import express from "express";
import usersRouter from './src/router/users.js'
import reviesRouter from './src/router/reviews.js'
import propertiesRouter from './src/router/properties.js'
import hostsRouter from './src/router/hosts.js'
import bookingsRouter from './src/router/bookings.js'
import amenitiesRouter from './src/router/amenities.js'
import loginRouter from './src/router/login.js'
import errorHandler from "./src/middleware/errorHandler.js";
import log from './src/middleware/logMiddleware.js';
// import PrismaClient from '@prisma/client';

const app = express();

Sentry.init({
  dsn: 'https://7fdbd08136c967e2f9806d5b2fa3712c@o4506121043443712.ingest.sentry.io/4506371956867072',
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
    // Automatically instrument Node.js libraries and frameworks
    ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});
// RequestHandler creates a separate execution context, so that all
// transactions/spans/breadcrumbs are isolated across requests
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());


app.use('/login', loginRouter);
app.use('/users', usersRouter)
app.use('/amenities', amenitiesRouter);
app.use('/hosts', hostsRouter);
app.use('/properties', propertiesRouter );
app.use('/bookings', bookingsRouter);
app.use('/reviews', reviesRouter)

app.use(log);
app.use(express.json());

app.use(Sentry.Handlers.errorHandler());

app.get('/', (req, res) => {
  res.send('Hello madWorld!')
})
// app.use(errorHandler);
app.listen(3000, () => {
  console.log('Server is listening on port 3000')
})
