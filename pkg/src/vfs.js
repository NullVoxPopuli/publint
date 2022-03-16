import fs from 'node:fs'
import fsp from 'node:fs/promises'
import nodePath from 'node:path'

/**
 * Creates a node-compatible Vfs object
 * @returns {import('types').Vfs}
 */
export function createNodeVfs() {
  return {
    async readFile(path) {
      return await fsp.readFile(path, 'utf8')
    },
    async readDir(path) {
      return await fsp.readdir(path)
    },
    async isPathDir(path) {
      return (await fsp.stat(path)).isDirectory()
    },
    async isPathExist(path) {
      return fs.existsSync(path)
    },
    // TODO: Manually create these
    pathJoin(...parts) {
      return nodePath.join(...parts)
    },
    pathResolve(...parts) {
      return nodePath.resolve(...parts)
    },
    pathRelative(from, to) {
      return nodePath.relative(from, to)
    },
    getDirName(path) {
      return nodePath.dirname(path)
    },
    getExtName(path) {
      return nodePath.extname(path)
    }
  }
}
