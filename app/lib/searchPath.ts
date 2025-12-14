const fs = require('fs');
const path = require('path');

interface BlogsInfo {
	dirs: string[];
	name: string | undefined;
}

export default function searchFiles () {
	const blogsInfo: BlogsInfo[] = [];
	const allDirents = fs.readdirSync("markdown", { withFileTypes: true });

	for (const dirent of allDirents) {
		const file: BlogsInfo = {
			dirs: [],
			name: undefined,
		}
		if (dirent.isDirectory()) {
			file.dirs.push(dirent);
		} else if (dirent.isFile() && ['.md'].includes(path.extname(dirent.name))) {
			file.name = dirent;
		}

		if (file) { blogsInfo.push(file); }
	}
	return blogsInfo;
};
