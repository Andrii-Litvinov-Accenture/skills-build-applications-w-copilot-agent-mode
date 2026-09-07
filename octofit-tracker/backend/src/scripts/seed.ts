import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await Promise.all([
      User.create({
        username: 'alex.runner',
        email: 'alex.runner@example.com',
        displayName: 'Alex Rivera',
      }),
      User.create({
        username: 'jamie.lifts',
        email: 'jamie.lifts@example.com',
        displayName: 'Jamie Chen',
      }),
      User.create({
        username: 'sam.cycles',
        email: 'sam.cycles@example.com',
        displayName: 'Sam Patel',
      }),
    ]);

    const teams = await Promise.all([
      Team.create({
        name: 'Morning Momentum',
        description: 'Start strong and keep the streak moving.',
        memberIds: [users[0]._id, users[1]._id],
      }),
      Team.create({
        name: 'Weekend Warriors',
        description: 'Consistent progress, one weekend at a time.',
        memberIds: [users[1]._id, users[2]._id],
      }),
    ]);

    await Activity.create([
      {
        userId: users[0]._id,
        type: 'Run',
        durationMinutes: 32,
        calories: 310,
        completedAt: new Date('2026-09-06T07:30:00Z'),
      },
      {
        userId: users[1]._id,
        type: 'Strength',
        durationMinutes: 45,
        calories: 280,
        completedAt: new Date('2026-09-06T08:00:00Z'),
      },
      {
        userId: users[2]._id,
        type: 'Cycling',
        durationMinutes: 55,
        calories: 470,
        completedAt: new Date('2026-09-05T09:00:00Z'),
      },
    ]);

    await LeaderboardEntry.create([
      { userId: users[0]._id, teamId: teams[0]._id, points: 840, period: '2026-W36' },
      { userId: users[1]._id, teamId: teams[0]._id, points: 790, period: '2026-W36' },
      { userId: users[2]._id, teamId: teams[1]._id, points: 715, period: '2026-W36' },
    ]);

    await Workout.create([
      {
        title: 'Desk Break Reset',
        description: 'A quick mobility session for busy afternoons.',
        difficulty: 'beginner',
        durationMinutes: 12,
        tags: ['mobility', 'office'],
      },
      {
        title: 'Full Body Foundation',
        description: 'Build strength with a balanced full-body circuit.',
        difficulty: 'intermediate',
        durationMinutes: 35,
        tags: ['strength', 'full-body'],
      },
      {
        title: 'Tempo Run Builder',
        description: 'Improve pacing with a focused running workout.',
        difficulty: 'advanced',
        durationMinutes: 40,
        tags: ['running', 'cardio'],
      },
    ]);

    console.log('Database seeding complete: 3 users, 2 teams, 3 activities, 3 leaderboard entries, 3 workouts');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
