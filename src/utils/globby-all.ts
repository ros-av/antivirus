import pMap from "p-map"
import globby from "globby"
import _ from "lodash"

export default async function globifyAll(arr: string | string[]) {
    const array = _.castArray(arr)
    const res = await pMap(array, path => globby(path))
    return _.flattenDeep(res)
}
