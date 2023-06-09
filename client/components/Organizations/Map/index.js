import dynamic from 'next/dynamic'

export const DynamicOrgMap = dynamic(() => import('./OrgMap'), {ssr: false})