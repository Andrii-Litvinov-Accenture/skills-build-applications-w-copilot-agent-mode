import { Router } from 'express';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';

export const apiRouter = Router();

function registerCollectionRoutes(path: string, model: typeof User) {
  apiRouter.get(path, async (_request, response) => {
    const documents = await model.find().sort({ createdAt: -1 }).lean();
    response.json(documents);
  });

  apiRouter.post(path, async (request, response) => {
    const document = await model.create(request.body);
    response.status(201).json(document);
  });
}

registerCollectionRoutes('/users', User);
registerCollectionRoutes('/teams', Team);
registerCollectionRoutes('/activities', Activity);
registerCollectionRoutes('/leaderboard', LeaderboardEntry);
registerCollectionRoutes('/workouts', Workout);