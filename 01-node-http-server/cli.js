import { readdir, stat } from "node:fs/promises"
import { join } from "node:path"

const dir = process.argv[2] ?? "."

const formatBytes = (size) => {
  if (size < 1024) return `${size} B`
  return `${(size / 1024).toFixed(2)} KB`
}

const files = await readdir(dir, { withFileTypes: true })

const entries = await Promise.all(
  files.map(async (file) => {
    const filePath = join(dir, file.name)
    const stats = await stat(filePath)

    return {
      name: file.name,
      size: formatBytes(stats.size),
      isDirectory: stats.isDirectory(),
    }
  })
)

console.log(entries)

for (const entry of entries) {
  console.log(
    `${entry.isDirectory ? "📁" : "📄"} ${entry.name} - ${entry.size}`
  )
}

// sort
// 1. Que aparezcan primero las carpetas
//2. Que esten en orden alfabetico los ficheros
// filter
// tener en cuenta flags como files-only o -dirs-onlyi