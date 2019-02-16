var fs = require('fs');
var directory = process.argv[2];

(async () => {
    const getIndexEntry = (path) => {
        return new Promise((resolve, reject) => {
            fs.stat(path, function (error, stat) {
                if (error) {
                    reject(error)
                }

                if (stat.isFile()) {
                    try {
                        const content = fs.readFileSync(path, 'utf8');
                        const articleData = JSON.parse(content);
                        resolve({
                            summary: articleData.summary,
                            title: articleData.title,
                            slug: articleData.slug,
                            updatedOn: stat.mtime
                        });
                    } catch (e) {
                        reject(e);
                    }
                }

            });
        });
    };

    const getFilesInDirectory = (directory) => {
        return new Promise((resolve, reject) => {
            fs.readdir(directory, function (err, files) {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(files);
            });
        })
    };

    const files = await getFilesInDirectory(directory);
    const articleIndex = await Promise.all(files.filter(file => file !== "articles.json").map(path => getIndexEntry(directory + "/" + path)));

    console.log(JSON.stringify(articleIndex));
})();