export function joinSpace(...arr: (string | false | undefined | null)[]) {
  return arr.filter((item) => !!item).join(' ')
}
