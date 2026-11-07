import z from '@deepseek-ai/schemastery'
import { mountService } from './launcher.mjs'
export const name='dsh-live-studio'
export const inject=['connection']
export const Config=z.object({enabled:z.boolean().default(false),home:z.string().default(''),
  persona:z.string().default(''),python:z.string().default('python'),port:z.number().default(3088),
  jingyuUrl:z.string().default(''),model:z.string().default(''),pet:z.string().default(''),
  room:z.number().default(0),credential:z.string().default(''),ledger:z.string().default('')})
export function apply(ctx,config){mountService(ctx,config,name)}
