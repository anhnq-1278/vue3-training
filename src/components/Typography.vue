<script lang="ts" setup>
import { h } from 'vue'

type TypographyVariants = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'
type TypographyAligns = 'center' | 'left' | 'right' | 'justify'
type TypographyWeights = 'light' | 'regular' | 'medium' | 'semibold' | 'bold'
type TypographyFontSizes = 'xs' | 'sm' | 'base' | 'l' | 'xl' | '2xl'
type TypographyTransforms = 'none' | 'lowercase' | 'uppercase' | 'capitalize'

interface ITypographyProps {
  variant?: TypographyVariants
  align?: TypographyAligns
  weight?: TypographyWeights
  size?: TypographyFontSizes
  transform?: TypographyTransforms
  text: string
  class?: string
}

const props = withDefaults(defineProps<ITypographyProps>(), {
  text: '',
  variant: 'p',
  align: 'left',
  weight: 'regular',
  size: 'base',
  transform: 'none'
})

const component = () =>
  h(
    props.variant,
    {
      class: `text-${props.align} font-${props.weight} text-${props.size} ${props.transform} ${props.class}`
    },
    `${props.text}`
  )
</script>

<template>
  <component :is="component"></component>
</template>
