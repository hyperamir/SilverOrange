import { Router, Request, Response, response } from 'express';
import { Repo } from '../models/Repo';
import fetch from 'node-fetch';
import reposJson from '../../data/repos.json';

export const repos = Router();

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');
  console.log('file:',reposJson)
  const apiUrl = 'https://api.github.com/users/silverorange/repos';
  const data = await fetch(apiUrl);
  const repoData = await data.json();
  //filter repo data based on fork: false"
  const repoDataFalseFork = repoData.filter((data: any) => data.fork == false);
  const aggregatedData = repoDataFalseFork.concat(reposJson);
  res.status(200);

  // TODO: See README.md Task (A). Return repo data here. You’ve got this!
  res.json(aggregatedData);
});
