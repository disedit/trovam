export const useLinks = () => {
  return {
    internalLink: (link) => {
      return link.startsWith('/') ? link : '/' + link
    }
  }
}
