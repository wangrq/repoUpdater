
**repoUpdater** is a simple tool to batch update local git repos. It's written in javascript, run on Node 8.0+.

It's used to fetch the latest updates from remote git repos, and merge them to your local copies.

Internally it will iterate all the sub folders that contains ".git" in the current working directory, navigate to each of these folders and call "**git pull origin master**".

<p align='center'>
<img src="https://github.com/wangrq/repoUpdater/blob/master/example.svg" width='767' alt='example image'/>
</p>

## Usage

Your local folder may looks like:
 * MyGitRepos/
   * React/
   * React Native/
   * Webpack/
   * Other repos or normal folders
   * repoUpdater/

Run the bellow command to update all the repos:
`$ npx repoUpdater`

## Installation

The package can be downloaded directly to your machine.

Then go to the repoUpdater folder, install the dependencies:

`$ npm install`
