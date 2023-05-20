import { useState } from 'react'
import { useRouter } from 'next/router'

export function toggle = () => {
	const router = useRouter()

	const theme = localStorage.getItem('theme')
	console.log(theme)
	if (theme == 'dark'){ localStorage.setItem('theme', 'light')} 
	else{ localStorage.setItem('theme', 'dark')}
	router.reload()
}

export function getTheme = () => {
	const theme = localStorage.getItem('theme')
	console.log(theme)
	if (theme == 'dark'){return 'dark'} 
	else{ return 'light'}
}