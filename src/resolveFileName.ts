import { ResolveFileNameParams } from './model';
import * as path from 'path';

/**
 * acronyms
 *
 * src/views/Home/index.ts
 * log :[s.v.H:index.ts:18]
 */
export function acronyms(obj: ResolveFileNameParams) {
  const arr = path
    .relative(obj.projectPath, obj.filename)
    .split(/[\\\/]/)
    .filter((r) => r);

  const last = arr.pop();
  const filename = arr.map((r) => r[0]).join('.') + ':' + last;

  let value = obj.prefix ? obj.prefix + ' ' : '';
  value += `[${filename}:${obj.line}]`;
  return value;
}
/**
 * fullpath
 *
 * src/views/Home/index.ts
 * log :src/views/Home [index.ts:18]
 */
export function fullpath(obj: ResolveFileNameParams) {
  const filename = path.relative(obj.projectPath, obj.filename);
  let value = '';
  value += obj.prefix ? obj.prefix + ' ' : '';
  value += `[${filename}:${obj.line}]`;

  return value;
}
