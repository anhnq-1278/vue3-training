<script lang="ts" setup>
import { h } from 'vue'

type TypographyVariants = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'
type TypographyAligns = 'center' | 'left' | 'right' | 'justify'
type TypographyWeights = 'light' | 'regular' | 'medium' | 'semibold' | 'bold'
type TypographyFontSizes = 'text-xs' | 'text-sm' | 'text-base' | 'text-l' | 'text-xl' | 'text-2xl'
type TypographyTransforms = 'none' | 'lowercase' | 'uppercase' | 'capitalize'

interface ITypographyProps {
  variant?: TypographyVariants
  align?: TypographyAligns
  weight?: TypographyWeights
  size?: TypographyFontSizes
  transform?: TypographyTransforms
}

const props = withDefaults(defineProps<ITypographyProps>(), {
  variant: 'p',
  align: 'left',
  weight: 'regular',
  size: 'text-base',
  transform: 'none'
})

const component = () =>
  h(
    props.variant,
    { class: `text-${props.align} font-${props.weight} ${props.size} ${props.transform}` },
    'from render function'
  )
</script>

<template>
  <component :is="component"></component>
</template>
