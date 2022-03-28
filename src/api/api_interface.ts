/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import fetch, { RequestInit } from 'node-fetch';
import * as dotenv from 'dotenv';
import { URLSearchParams } from 'url';
dotenv.config({
  path: `${__dirname}/./../../.env`,
});

export const config = {
  UA: 'GDMDashboardBot/2.0 (slack: #soap)',
  HOME_WIKI: 'https://discussions.fandom.com',
  HOME_ROOT_PAGE: 'Data:Overview',
  SERVICES: 'https://services.fandom.com',
  EDIT_SUMMARY: 'Automatic: Updating GDMDashboard data',
  ACCESS_TOKEN: process.env.ACCESS_TOKEN,
  RELEVANT_GROUPS: [
    'global-discussions-moderator',
    'soap',
    'wiki-manager',
    'helper',
  ],
};
const headers = {
  'User-Agent': config.UA,
  'Content-Type': 'application/x-www-form-urlencoded',
  cookie: `fandom_session=${config.ACCESS_TOKEN}`,
  // required only during the transition period, can be removed after April
  'X-Fandom-Auth': 1,
};

export class ApiInterface {
  async request<T = any>({ method, path, params, body, options }: {
    method: 'GET' | 'POST',
    path: string,
    params?: any,
    body?: any,
    options?: Partial<RequestInit>,
  }): Promise<T> {
    const paramsString = params ? `?${new URLSearchParams(params)?.toString()}` : '';
    const res = await fetch(`${path}${paramsString}`, {
      method,
      headers,
      body,
      ...options,
    });
    return await res.json();
  }

  async mwGet<T = any>(wiki: string, params: any, options?: Partial<RequestInit>): Promise<T> {
    return this.request({
      method: 'GET',
      path: `https://${wiki}/api.php`,
      params,
      options,
    });
  }

  async mwPost<T = any>(wiki: string, params?: any, body?: any, options?: Partial<RequestInit>): Promise<T> {
    return this.request({
      method: 'POST',
      path: `https://${wiki}/api.php`,
      params,
      body: new URLSearchParams(body).toString(),
      options,
    });
  }

  async wikiaGet<T = any>(wiki: string, params: any, options?: Partial<RequestInit>): Promise<T> {
    return this.request({
      method: 'GET',
      path: `https://${wiki}/wikia.php`,
      params,
      options,
    });
  }

  async wikiaPost<T = any>(wiki: string, params: any, body: any, options?: Partial<RequestInit>): Promise<T> {
    return this.request({
      method: 'POST',
      path: `https://${wiki}/wikia.php`,
      params,
      body,
      options,
    });
  }
}
