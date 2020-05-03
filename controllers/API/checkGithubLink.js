const checkGithub = (repo) => {
    if(repo.startsWith('https://github.com/') || repo.startsWith('github.com/')){
        return true
    }
    return false
}

module.exports = checkGithub