export const useLinks = () => {
  return {
    internalLink: (link) => {
      if (!link) return ''
      return link.startsWith('/') ? link : '/' + link
    }
  }
}
