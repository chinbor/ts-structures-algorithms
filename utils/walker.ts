import path from 'node:path'
import { execSync } from 'node:child_process'
import { allFiles } from 'async-folder-walker'
import prompts from 'prompts'

interface FileNames {
  fileName: string
  filePath: string
}

async function go(dirName: string): Promise<FileNames[]> {
  const allFilepaths = await allFiles(dirName, null)

  const parsedFiles = allFilepaths.map((p) => {
    const normalizedPath = path.normalize(p).replace(/\\/g, '/')

    const matchers = normalizedPath.match(/(.*)\/(.*\..*)/)

    return {
      fileName: matchers![2],
      filePath: normalizedPath,
    }
  })

  return parsedFiles
}

go('examples').then(async (files) => {
  try {
    const result = await prompts([
      {
        type: 'select',
        name: 'fileName',
        message: 'please choose file from below to run: ',
        initial: 0,
        choices: files.map((f) => {
          return {
            title: f.fileName,
            value: f.filePath,
          }
        }),
      },
    ], {
      onCancel: () => {
        throw new Error('Operation cancelled')
      },
    })

    const { fileName } = result

    execSync(`esno ${fileName}`)
  }
  catch (cancelled) {
    // eslint-disable-next-line no-console
    console.log(cancelled.message)
  }
})
