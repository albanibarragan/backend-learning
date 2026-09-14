import { readFile, writeFile, mkdir } from 'node:fs/promises'

async function processFile() {
  try {

    const content = await readFile('./archivo.txt', 'utf-8')


    await mkdir('output/files/documents', { recursive: true })

    const uppercasecontent = content.toUpperCase()

    await writeFile('output/files/documents/archivo-uppercase.txt', uppercasecontent)
    await writeFile('archivo.txt', uppercasecontent)

    console.log('Success! New content is:\n', uppercasecontent)

  } catch (error) {
    console.error('An error occurred while processing the file:', error.message)
  }
}

processFile()