import dynamic from 'next/dynamic'

export const DynamicOrgMap = dynamic(() => import('./ContactMap'), {ssr: false})