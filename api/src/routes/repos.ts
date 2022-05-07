import { Router, Request, Response } from 'express';
import fetch from 'node-fetch';
import reposJson from '../../data/repos.json';

export const repos = Router();

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');
  const apiUrl = 'https://api.github.com/users/silverorange/repos';
  const data = await fetch(apiUrl);
  const repoData = await data.json();

  // concatenate repo data from api and repo from repos.json file
  const aggregatedData = repoData.concat(reposJson);

  // filter repo data based on fork: false"
  const repoDataFalseFork = aggregatedData.filter((data: any) => data.fork == false);
  res.status(200);

  // TODO: See README.md Task (A). Return repo data here. You’ve got this!
  res.json(repoDataFalseFork);
});
