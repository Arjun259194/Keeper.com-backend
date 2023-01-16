import colors from "colors"

colors.enable()

export const serverRunning = (port: string): void => {
	console.log("SERVER RUNNING".yellow.bold)
	console.log("local:".bold, `http://localhost:${port}`.underline.cyan)
}

export const errorMessage = (error: unknown): void => {
	console.error("ERROR".red.bold)
	console.log(`${error}`.red)
}
