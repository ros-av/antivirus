export default function infiniteArgs(first, other) {
    return [first, ...other.slice(1)]
}
