deploy:
	pnpm run build
	pnpm run fmt
	firebase deploy