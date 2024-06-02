import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { RoughEase } from "gsap/EasePack"

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(RoughEase) 

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(gsap)
  nuxtApp.provide('gsap', gsap)
  nuxtApp.provide('ScrollTrigger', ScrollTrigger)

  nuxtApp.hook('page:transition:finish', () => {
    ScrollTrigger.refresh()
  })
})
