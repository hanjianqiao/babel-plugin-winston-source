import { ResolveFileNameParams as resolveFileName } from './model';
import path from 'path';

/**
 * acronyms
 *
 * src/views/Home/index.ts
 * log :s.v.H [index.ts:18]
 */
export function acronyms(obj: resolveFileName) {
  //
  const filename = path.relative(obj.projectPath, obj.filename).replace(/\/\//g, '/');
  filename
    .split(/[\\\/]/)
    .filter((r) => r)
    .map((r) => r[0])
    .join('.');
  return '';
}
/**
 * fullpath
 *
 * src/views/Home/index.ts
 * log :src/views/Home [index.ts:18]
 */
export function fullpath(obj: resolveFileName) {
  const filename = path.relative(obj.projectPath, obj.filename);
  let value = '';
  value += obj.prefix ? obj.prefix + ' ' : '';
  value += `[${filename}:${obj.line}]`;
  return value;
}
