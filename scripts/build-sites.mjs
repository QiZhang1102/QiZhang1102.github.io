import { cp, mkdir, writeFile } from 'node:fs/promises'

const serverSource = `const indexRequest = (request) => {
  const url = new URL(request.url)
  url.pathname = '/index.html'
  url.search = ''
  return new Request(url, request)
}

export default {
  async fetch(request, env) {
    if (env?.ASSETS) {
      const url = new URL(request.url)
      const isAssetRequest = url.pathname !== '/' && !url.pathname.endsWith('.html')

      if (isAssetRequest) {
        const assetResponse = await env.ASSETS.fetch(request)
        if (assetResponse.status !== 404) {
          return assetResponse
        }
      }

      return env.ASSETS.fetch(indexRequest(request))
    }

    return new Response('Site assets are unavailable.', { status: 503 })
  },
}
`

await mkdir('dist/server', { recursive: true })
await mkdir('dist/.openai', { recursive: true })
await writeFile('dist/server/index.js', serverSource)
await cp('.openai/hosting.json', 'dist/.openai/hosting.json')
