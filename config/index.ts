import { readFileSync } from 'fs'
import * as yaml from 'js-yaml'
import { join } from 'path'
const environment = process.env.NODE_ENV ?? 'dev'
const getConfig = (type?: string) => {
    const yamlPath = join(process.cwd(), `./config/${environment}.yaml`)
    const config = yaml.load(readFileSync(yamlPath, 'utf8')) as Record<string, any>
    if (type) {
        return config[type]
    }
    return config
}
export default getConfig
