import express from 'express';
import cors from 'cors';
import './config/database.js';
import { apiRouter } from './routes/api.js';

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());
app.use(cors());
app.use('/api', apiRouter);

app.get('/', (_request, response) => {
  response.json({
    name: 'OctoFit Tracker API',
    baseUrl,
    health: `${baseUrl}/api/health`,
    resources: ['users', 'teams', 'activities', 'leaderboard', 'workouts'].map(
      (resource) => `${baseUrl}/api/${resource}/`,
    ),
  });
});

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', database: 'configured', baseUrl });
});

app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  console.error(error);
  response.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`OctoFit API listening on ${baseUrl}`);
});