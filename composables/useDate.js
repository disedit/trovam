import { format } from 'date-fns'
import { ca, es, enGB } from 'date-fns/locale'

const locales = { ca, es, en: enGB }

export const useDate = () => {
  const { locale } = useI18n()

  return {
    longDate (date) {
      return format(date, 'EEEE, d MMMM y', { locale: locales[locale.value] })
    }
  }
}
